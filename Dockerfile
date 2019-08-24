FROM node:lts-alpine

WORKDIR /app
COPY . .

RUN npm install --production
ENV NODE_ENV=production \
    HOST=localhost \
    PORT=8888 \
    STUN_SERVER_DOMAIN=stun.l.google.com \
    STUN_SERVER_PORT=19302

USER node
CMD ["node", "server.js"]
