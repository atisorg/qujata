# Copyright 2026 Telefónica Innovación Digital (alexandremiquel.frauamar.practicas@telefonica.com, antonio.pastorperales@telefonica.com)

# Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

# The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

# THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

#!/bin/bash

#######################
#PARAMETER RECEPTION
#######################
# Check if parameter was provided
if [ -z "$1" ]; then
    echo "Error: No parameter provided. Usage: $0 [mlkem512|mlkem768|mlkem1024]" >&2
    exit 1
fi

#######################
#ERROR CONTROL
#######################
# Validate the input parameter
NEW_VALUE="$1"
case "$NEW_VALUE" in
    mlkem512|mlkem768|mlkem1024)
        # Valid parameter, continue
        ;;
    *)
        echo "Error: Invalid parameter. Must be mlkem512, mlkem768, or mlkem1024" >&2
        exit 1
        ;;
esac

# Define the target directory and file
TARGET_DIR="/usr/local/etc/swanctl"
CONF_FILE="swanctl.conf"
#FULL_PATH="$TARGET_DIR/$CONF_FILE"

# Check if the script is run as root (since /usr/local/etc may require root privileges)
if [ "$(id -u)" -ne 0 ]; then
    echo "This script must be run as root" >&2
    exit 1
fi

# Check if the target directory exists
if [ ! -d "$TARGET_DIR" ]; then
    echo "Error: Directory $TARGET_DIR does not exist" >&2
    exit 1
fi

# Check if the configuration file exists
if [ ! -f "$TARGET_DIR/$CONF_FILE" ]; then
    echo "Error: File $TARGET_DIR/$CONF_FILE does not exist" >&2
    exit 1
fi

#######################

# Change to the target directory
cd "$TARGET_DIR" || {
    echo "Error: Failed to change to directory $TARGET_DIR" >&2
    exit 1
}

# Perform the replacement in the file
sed -i "s/mlkem\(512\|768\|1024\)/$NEW_VALUE/g" $CONF_FILE || {
    echo "Error: Failed to modify the configuration file" >&2
    exit 1
}

# Terminate connection
swanctl -t --child net-net || exit 1

# Load all connections
swanctl --load-all || exit 1

exit 0
