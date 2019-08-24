
[uri_license]: https://opensource.org/licenses/MIT
[uri_license_image]: https://img.shields.io/badge/license-MIT-blue.svg

[![License: AGPL v3][uri_license_image]][uri_license]
[![Build Status](https://travis-ci.org/Monogramm/signalmaster.svg)](https://travis-ci.org/Monogramm/signalmaster)
[![Docker Cloud Build Status](https://img.shields.io/docker/cloud/build/monogramm/docker-signalmaster.svg)](https://hub.docker.com/r/monogramm/docker-signalmaster/)
[![Docker Pulls](https://img.shields.io/docker/pulls/monogramm/docker-signalmaster.svg)](https://hub.docker.com/r/monogramm/docker-signalmaster/)
[![Docker layers](https://images.microbadger.com/badges/image/monogramm/docker-signalmaster.svg)](https://microbadger.com/images/monogramm/docker-signalmaster)

:construction: **This image is still in development!**

# signalmaster

A simple signaling server for NextCloud Talk to connect and do signaling for WebRTC.

This repository aims to provide a default connection point for [NextCloud Talk](https://github.com/nextcloud/spreed).
It was created from the simple [signalmaster](https://github.com/simplewebrtc/signalmaster) for [SimpleWebRTC.js](https://github.com/HenrikJoreteg/SimpleWebRTC), whose open-source version has now been deprecated.

It also supports vending STUN/TURN servers with the shared secret mechanism as described in [this draft](http://tools.ietf.org/html/draft-uberti-behave-turn-rest-00). This mechanism is implemented e.g. by [rfc-5766-turn-server](https://code.google.com/p/rfc5766-turn-server/) or by a [patched version](https://github.com/otalk/restund) of [restund](http://creytiv.com/restund.html).

Read more:
- [NextCloud Talk External signaling API](https://github.com/nextcloud/spreed/blob/master/docs/standalone-signaling-api-v1.md)
- [SimpleWebRTC.com](http://simplewebrtc.com)

## Running

Running the server requires a valid installation of node.js which can be installed from the nodejs.org website. After installing the package you will need to install the node dependencies.

1. `npm install`

2. run the server using `node server.js`

3. In the console you will see a message which tells you where the server is running:

        						"signal master is running at: http://localhost:8888"

4. Open a web browser to the specified URL and port to ensure that the server is running properly. You should see the message when you go to the /socket.io/ subfolder (e.g. http://localhost:8888/socket.io/), you should see a message like this:

        						{"code":0,"message":"Transport unknown"}

### Production Environment

* generate your ssl certs
    ```shell
    $ ./scripts/generate-ssl-certs.sh
    ```
* run in Production mode
    ```shell
    $ NODE_ENV=production ROOM_MAX_CLIENTS=0 SSL_KEY=./sslcerts/key.pem SSL_CERT=./sslcerts/cert.pem STUN_SERVER_DOMAIN=your.turn.servers.here STUN_SERVER_PORT=5449 TURN_SERVER_DOMAIN=your.turn.servers.here TURN_SERVER_PORT=5449 TURN_SERVER_SECRET=turnserversharedsecret node server.js
    ```

## Use with Express
    ```js
    var express = require('express')
    var sockets = require('signalmaster/sockets')

    var app = express()
    var server = app.listen(port)
    sockets(server, config) // config is the same that server.js uses
    ```

## Docker

You can build then run this image by calling:  

    ```shell
    docker build -t signalmaster https://github.com/Monogramm/signalmaster
    docker run --name signalmaster -d -p 8888:8888 signalmaster
    ```

To run the image from Dockerhub execute this:

    ```shell
    docker run --name signalmaster -d -p 8888:8888 monogramm/docker-signalmaster
    ```

This will start a signal master server on port 8888 exposed on port 8888.

By default, the docker image will run as production.
