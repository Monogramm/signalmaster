FROM node:lts-alpine

WORKDIR /app
COPY . .

RUN set -e;\
    npm install --production; \
    apk add --update --no-cache --virtual .build-deps \
        openssl \
    ; \
    ./scripts/generate-ssl-certs.sh; \
	apk --purge del .build-deps; \
    chown -R node:node sslcerts/

ENV NODE_ENV=production \
    HOST=localhost \
    PORT=8888 \
    ROOM_MAX_CLIENTS=0 \
    STUN_SERVER_DOMAIN=stun.l.google.com \
    STUN_SERVER_PORT=19302 \
    TURN_SERVER_DOMAIN= \
    TURN_SERVER_PORT= \
    TURN_SERVER_SECRET= \
    SSL_KEY=./sslcerts/key.pem \
    SSL_CERT=./sslcerts/cert.pem \
    SSL_PASSWORD=

USER node
CMD ["node", "server.js"]
