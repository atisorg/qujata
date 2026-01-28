# (C) Copyright 2026 Telefónica Innovación Digital (alexandremiquel.frauamar.practicas@telefonica.com, antonio.pastorperales@telefonica.com)

import logging

from flask import Blueprint, jsonify, request, current_app
from flask_cors import cross_origin
import src.services.analyze_service as analyze_service
from src.exceptions.exceptions import ApiException

api = Blueprint('qujata-api', __name__)
process_is_running = False

# constants
HTTP_STATUS_LOCKED = 423
HTTP_STATUS_BAD_REQUEST = 400
HTTP_STATUS_INTERNAL_SERVER_ERROR = 500

INVALID_DATA_MESSAGE = 'Invalid data provided'

@api.route('/analyze', methods=['POST'])
@cross_origin(origins=['*'], supports_credentials=True)
def analyze():
    global process_is_running
    data = request.get_json()
    try:
        __validate(data)
        process_is_running = True
        result = analyze_service.analyze(data)
        process_is_running = False
        return result
    except ApiException as e:
        process_is_running = False
        return jsonify({'error': e.error, 'message': e.message}), e.status_code
    except Exception as e:
        process_is_running = False
        logging.exception("Exception: Failed to run analyze request with error: %s", e)
        return jsonify({'error': 'An error occurred while processing the request', 'message':''}), HTTP_STATUS_INTERNAL_SERVER_ERROR

def __validate(data):
    if not data or (('algorithms' not in data or 'iterationsCount' not in data or 'experimentName' not in data or 'description' not in data) and ('ipsecAlgorithms' not in data or 'time' not in data or 'connections' not in data or 'messageSizeIperf' not in data or 'bandwidth' not in data or 'intervals' not in data)):
        raise ApiException('Missing properties. Required properties for TLS: algorithms, iterationsCount, experimentName, description. Requiered properties for Ipsec: , ipsecAlgorithms, time, connections, messageSizeIperf, bandwidth, intervals', INVALID_DATA_MESSAGE, HTTP_STATUS_BAD_REQUEST)
    if 'iterationsCount' in data:
        for iterations in data['iterationsCount']:
            if iterations <= 0:
                raise ApiException('The number of iterations should be greater than 0', INVALID_DATA_MESSAGE, HTTP_STATUS_BAD_REQUEST)
    if 'messageSizes' in data:
        for message_size in data['messageSizes']:
            if message_size < 0:
                raise ApiException('The message size should be greater than -1', INVALID_DATA_MESSAGE, HTTP_STATUS_BAD_REQUEST)
    if process_is_running:
        raise ApiException('The previous test is still running. Please try again in few minutes', 'Current test is still running', HTTP_STATUS_LOCKED)
    if 'algorithms' in data:
        for algorithm in data.get('algorithms'):
            if algorithm not in current_app.configurations.allowed_algorithms:
                raise ApiException('Algorithm "' + algorithm + '" is not supported', INVALID_DATA_MESSAGE, HTTP_STATUS_BAD_REQUEST)
    if 'time' in data:
        for time in data['time']:
            if time <= 0:
                raise ApiException('The duration should be greater than 0', INVALID_DATA_MESSAGE, HTTP_STATUS_BAD_REQUEST)
    if 'connections' in data:
        for connections in data['connections']:
            if connections <= 0:
                raise ApiException('The number of connections should be greater than 0', INVALID_DATA_MESSAGE, HTTP_STATUS_BAD_REQUEST)
    if 'messageSizeIperf' in data:
        for messageSizeIperf in data['messageSizeIperf']:
            if messageSizeIperf <= 0:
                raise ApiException('The message size should be greater than 0', INVALID_DATA_MESSAGE, HTTP_STATUS_BAD_REQUEST)
    if 'bandwidth' in data:
        for bandwidth in data['bandwidth']:
            if bandwidth <= 0:
                raise ApiException('The bandwidth should be greater than 0', INVALID_DATA_MESSAGE, HTTP_STATUS_BAD_REQUEST)
    if 'intervals' in data:
        for intervals in data['intervals']:
            if intervals <= 0:
                raise ApiException('The number of intervals should be greater than 0', INVALID_DATA_MESSAGE, HTTP_STATUS_BAD_REQUEST)
