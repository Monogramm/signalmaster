'use strict';

module.exports = {
  description: 'Prosody authentication check for registered user sessions',
  tags: ['api', 'prosody', 'auth'],
  handler: function (request, h) {

    return h.response('true').type('text/plain').code(200);
  },
  //TODO response swagger
  auth: 'prosody-users'
};
