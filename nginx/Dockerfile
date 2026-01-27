# (C) Copyright 2026 Telefónica Innovación Digital (alexandremiquel.frauamar.practicas@telefonica.com, antonio.pastorperales@telefonica.com)

FROM openquantumsafe/nginx:latest

# NodeJS version > 14 requires not being in root directory while npm install
WORKDIR /usr/app

ADD nginx.conf /opt/nginx/nginx-conf/nginx.conf
ADD app.js app.js
ADD start.sh start.sh

USER root

RUN apk add --update nodejs npm
RUN npm install express
RUN chmod +x start.sh

# Install tmux
RUN apk update && apk add tmux

# Install iPerf service
RUN apk add iperf3

# Make ip route changes to stablish IPsec tunnel and launches iperf server session
COPY script.sh /
RUN chmod +x /script.sh
ENTRYPOINT ["/script.sh"]

USER oqs



CMD ["./start.sh"]