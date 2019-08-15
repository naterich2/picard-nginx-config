var https = require('https');
var cp = require('child_process');
var credentials = require('./credentials.js');
var IP = cp.execSync('curl -s -X GET "https://myip.dnsomatic.com"');
var options1 = {
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
var options2 = {
  host: 'api.cloudflare.com',
  port: '443',
  path: '/client/v4/zones/'+credentials.zone+'/dns_records/'+credentials.dns_record_vpn,
  method: 'PUT',
	headers: {
		"X-Auth-Email": credentials.username,
		"X-Auth-Key": credentials.api_key,
		"Content-Type": "application/json",
	}
}
const req1 = https.request(options1, (res) => {
	res.on('data', (d) => {
		process.stdout.write(d);
	});
});
const req2 = https.request(options2, (res) => {
	res.on('data', (d) => {
		process.stdout.write(d);
	});
});
//process.stdout.write(IP);
var data1 = {
	type: "A",
	name: "nrichman.dev",
	content: IP.toString(),
	ttl: 3600,
	proxied: true
}
var data2 = {
	type: "A",
	name: "vpn.nrichman.dev",
	content: IP.toString(),
	ttl: 3600,
	proxied: false
}
//process.stdout.write(JSON.stringify(data));
req1.write(JSON.stringify(data1));
req1.end();
req2.write(JSON.stringify(data2));
req2.end();
