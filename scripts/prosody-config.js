const Config = require('getconfig');

const inflateDomains = require('../lib/domains');
const buildUrl = require('../lib/buildUrl');
const Domains = inflateDomains(Config.talky.domains);


console.log(`
admins = {}
plugin_paths = { "${__dirname + '/../prosody_modules'}" }

daemonize = false

modules_enabled = {
    "saslauth"; "roster";
    "tls";
    "dialback";
    "disco";
    "private";
    "vcard";
    "version";
    "uptime";
    "time";
    "ping";
    "pep";
    "admin_adhoc";
    "admin_telnet";
    "http_altconnect";
    "posix";
    "bosh";
    "websocket";
}

allow_registration = false

c2s_require_encryption = true
s2s_secure_auth = true

cross_domain_bosh = true
cross_domain_websocket = true

consider_bosh_secure = true
consider_websocket_secure = true

log = {
    debug = "*console";
}
`);

if (Config.isDev) {
    console.log(`
modules_disabled = {
    "tls";
}
`)
}


console.log(`
VirtualHost "${Domains.api}"
`);

console.log(`
VirtualHost "${Domains.guests}"
    authentication = "http_async";
    http_auth_url = "${buildUrl('http', Domains.api)}/prosody/auth/guests";
`);

console.log(`
VirtualHost "${Domains.users}"
    authentication = "http_async";
    http_auth_url = "${buildUrl('http', Domains.api)}/prosody/auth/users";
`);

console.log(`
VirtualHost "${Domains.bots}"
    authentication = "http_async";
    http_auth_url = "${buildUrl('http', Domains.api)}/prosody/auth/users";
`);

console.log(`
Component "${Domains.rooms}" "muc"
`);