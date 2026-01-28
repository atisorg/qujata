# Copyright 2026 Telefónica Innovación Digital (alexandremiquel.frauamar.practicas@telefonica.com, antonio.pastorperales@telefonica.com)

# Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

# The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

# THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

from flask import Flask, request
import subprocess

app = Flask(__name__)

@app.route('/script', methods=['POST'])
def call_script():
    if request.method == 'POST':
        data = request.get_json()

        # Get parameters from the portal UI
        time = str(data.get('time'))
        parallel = str(data.get('connections'))
        message_size = str(data.get('messageSizeIperf'))
        bandwidth = str(data.get('bandwidth'))
        interval = str(data.get('intervals'))

        cmd = f"iperf3 -c 172.20.2.60 -u -J"

        if time:
            cmd += f" -t {time}"
        if parallel:
            cmd += f" -P {parallel}"
        if message_size:
            cmd += f" -l {message_size}"
        if bandwidth:
            cmd += f" -b {bandwidth}"
        if interval:
            cmd += f" -i {interval}"
        cmd += " > metrics.json" # Saves the experiment metrics in a json file

        try:
            r = subprocess.run(
                cmd,
                shell=True,
                capture_output=True,
                text=True,
                check=True
            )
            return r.stdout
        except subprocess.CalledProcessError as e:
            return f"Error running iperf petition: {e.stderr}", 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=30666)

