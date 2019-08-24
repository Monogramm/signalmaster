FROM node:lts-alpine

WORKDIR /app
COPY . .

RUN set -e;\
    npm install --production; \
    ./scripts/generate-ssl-certs.sh

ENV NODE_ENV=production \
    HOST=localhost \
    PORT=8888 \
    STUN_SERVER_DOMAIN=stun.l.google.com \
    STUN_SERVER_PORT=19302 \
    TURN_SERVER_DOMAIN= \
    TURN_SERVER_PORT= \
    TURN_SERVER_SECRET= \
    SSL_KEY= \
    SSL_CERT= \
    SSL_PASSWORD=

USER node
CMD ["node", "server.js"]
