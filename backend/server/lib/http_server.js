/* 
 * (C) 2015 TekMonks. All rights reserved.
 * License: MIT - see enclosed LICENSE file.
 */

var http = require("http");

exports.initSync = initSync;

function initSync(access_control, port, host="::") {
	access_control?access_control:"*";

	/* create HTTP server */
	LOG.info(`Attaching socket listener on ${host}:${port}`);
	exports.connection = http.createServer((_req, res) => {
		res.setHeader("Access-Control-Allow-Origin", access_control);
	}).listen(port, host);
}
