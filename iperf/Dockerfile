# Copyright 2026 Telefónica Innovación Digital (alexandremiquel.frauamar.practicas@telefonica.com, antonio.pastorperales@telefonica.com)

# Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

# The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

# THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

# Use an official Ubuntu base image
FROM ubuntu:latest

# Set environment variable to avoid interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Change to the main directory
WORKDIR /

# Update package lists and install dependencies
RUN apt-get update && apt-get install -y \
	make \
	cmake \
	gcc \
	g++ \
	wget \
	bzip2 \
	libssl-dev && \
	rm -rf /var/lib/apt/lists/*

# Install nano
RUN apt-get update && apt-get install -y nano

# Install iPerf service
RUN apt-get update && apt-get install -y iperf3

# Install tmux
RUN apt-get update && apt-get install -y tmux

# Install iproute
RUN apt-get update && apt-get install -y iproute2

# Install python and pip
RUN apt-get update && apt-get install -y python3 python3-pip

# Install python virtual environment
RUN apt-get update && apt-get install -y python3-venv

# Run virtual environment and install flask
RUN python3 -m venv flaskenv
RUN flaskenv/bin/pip install flask

# Copy file dependencies on root
COPY service.py /
COPY metrics_service.py /
COPY metrics.json /

# Run tmux script to launch flask service and Strongswan's charon
COPY script-tmux.sh /
RUN chmod +x /script-tmux.sh

ENTRYPOINT ["/script-tmux.sh"]

