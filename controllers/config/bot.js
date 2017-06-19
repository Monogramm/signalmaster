'use strict';

const Joi = require('joi');
const UUID = require('uuid');

const fetchICE = require('../../lib/fetchIce');
const inflateDomains = require('../../lib/domains');

const TalkyCoreConfig = require('getconfig').talky;
const Domains = inflateDomains(TalkyCoreConfig.domains);


module.exports = {
  description: 'Auto-configure a bot client session',
  tags: ['api'],
  handler: function (request, reply) {

    const userId = UUID.v4();

    return fetchICE().then(ice => {

      return reply({
        sessionId: userId,
        userId: `${userId}@${Domains.bots}`,
        signalingUrl: `wss://${Domains.api}/xmpp-websocket`,
        telemetryUrl: `https://${Domains.api}/telemetry`,
        roomServer: Domains.rooms,
        iceServers: ice,
        credential: 'some-signed-jwt-token'
      });
    });
  },
  validate: {
    payload: {
    }
  }
};
