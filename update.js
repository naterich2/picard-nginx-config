var https = require('https');
var cp = require('child_process');
var credentials = require('./credentials.js');
var IP = cp.execSync('curl -s -X GET "https://myip.dnsomatic.com"');	 
var options = {
  host: 'api.cloudflare.com',
  port: '443',
  path: '/client/v4/zones/'+credentials.zone+'/dns_records/'+credentials.dns_record,
  method: 'PUT',
	headers: {
		"X-Auth-Email": credentials.username,
		"X-Auth-Key": credentials.api_key,
		"Content-Type": "application/json",
	}
}
const req = https.request(options, (res) => {
	res.on('data', (d) => {
		process.stdout.write(d);
	});
});
//process.stdout.write(IP);
var data = {
	type: "A",
	name: "nrichman.dev",
	content: IP.toString(),
	ttl: 3600,
	proxied: false
}
//process.stdout.write(JSON.stringify(data));
req.write(JSON.stringify(data));
req.end();
