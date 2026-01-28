# (C) Copyright 2026 Telefónica Innovación Digital (alexandremiquel.frauamar.practicas@telefonica.com, antonio.pastorperales@telefonica.com)

import time
import requests
import logging
import json

from datetime import datetime, timedelta
from flask import jsonify, current_app
import src.services.test_suites_service as test_suites_service
import src.utils.metrics_collection_manager as metrics_collection_manager
from src.enums.status import Status

# constants
WAIT_MS = 15

def analyze(data):
    if 'algorithms' in data and 'iterationsCount'in data and 'messageSizes' in data:
        test_suite = test_suites_service.create_test_suite(data)
        # start time is now - 60 sec, to show the graph before the test for sure started running
        start_time = int(datetime.timestamp(datetime.now() - timedelta(seconds=60)) * 1000)
        iterations_count = data.get('iterationsCount', [])
        algorithms = data.get('algorithms', [])
        message_sizes = data.get('messageSizes', []) if 'messageSizes' in data else [0]
        first_run = True
        for algorithm in algorithms:
            for iterations in iterations_count:
                for message_size in message_sizes:
                    if not first_run:
                        time.sleep(WAIT_MS)
                    else:
                        first_run = False
                    __create_test_run(algorithm, iterations, message_size, test_suite.id)
    else:
        test_suite = test_suites_service.create_test_suite(data)
        # start time is now - 60 sec, to show the graph before the test for sure started running
        start_time = int(datetime.timestamp(datetime.now() - timedelta(seconds=60)) * 1000)
        ipsec_algorithms = data.get('ipsecAlgorithms', [])
        times_iperf = data.get('time', [])
        connections = data.get('connections', [])
        message_sizes_iperf = data.get('messageSizeIperf', [])
        bandwidths = data.get('bandwidth', [])
        intervals = data.get('intervals', [])
        for ipsec_algorithm in ipsec_algorithms:
            for time_iperf in times_iperf:
                for connection in connections:
                    for message_size_iperf in message_sizes_iperf:
                        for bandwidth in bandwidths:
                            for interval in intervals:
                                __run_iperf(ipsec_algorithm, time_iperf, connection, message_size_iperf, bandwidth*1000, interval)

    # end time is now + 90 sec, to show the graph after the test for sure finished running
    end_time = int(datetime.timestamp(datetime.now() + timedelta(seconds=90)) * 1000)

    test_suite.start_time = start_time
    test_suite.end_time = end_time
    test_suites_service.update_test_suite(test_suite)

    return jsonify({'test_suite_id': test_suite.id})


def __create_test_run(algorithm, iterations, message_size, test_suite_id):
    start_time = datetime.now()
    metrics_collection_manager.start_collecting()
    status, status_message, requests_size = __run(algorithm, iterations, message_size)
    metrics_collection_manager.stop_collecting()
    end_time = datetime.now()
    test_suites_service.create_test_run(start_time, end_time, algorithm, iterations, message_size, test_suite_id, status, status_message, requests_size, *metrics_collection_manager.get_metrics())


def __run(algorithm, iterations, message_size):
    logging.debug('Running test for algorithm: %s ', algorithm)
    payload = {
        'algorithm': algorithm,
        'iterationsCount': iterations,
        'messageSize': message_size
    }
    headers = { 'Content-Type': 'application/json' }
    response = requests.post(current_app.configurations.curl_url + "/curl", headers=headers, json=payload, timeout=int(current_app.configurations.request_timeout))

    return __validate_response(response)

def __run_iperf(ipsec_algorithm, time_iperf, connection, message_size_iperf, bandwidth, interval):
    logging.debug('Running test for IPsec algorithm: %s ', ipsec_algorithm)
    payload = {
        'ipsecAlgorithm': ipsec_algorithm,
        'time': time_iperf,
        'connections': connection,
        'messageSizeIperf': message_size_iperf,
        'bandwidth': bandwidth,
        'intervals': interval
    }
    headers = { 'Content-Type': 'application/json' }
    #############
    # Changing IPsec tunnel algorithm
    #############
    # Call to scripts in secgw1 and secgw2 with the corresponding IPsec algorithm
    response = requests.post('http://172.20.0.50:30666/script', headers=headers, json=payload)
    time.sleep(0.5) # Waits 0.5 seconds to make sure the changes were done
    response = requests.post('http://172.20.1.52:30666/script', headers=headers, json=payload)
    ############
    ############
    # Establishing iperf parameters
    ############
    logging.info("iPerf request:\n%s", json.dumps(payload, indent=4))
    response = requests.post('http://172.20.0.48:30666/script', headers=headers, json=payload, timeout=int(current_app.configurations.request_timeout))
    ############

def __validate_response(response):
    data = response.json()
    if response.status_code < 200 or response.status_code > 299:
        return Status.FAILED, json.dumps(data), 0
    else:
        return Status.SUCCESS, "", data.get('totalRequestSize')
