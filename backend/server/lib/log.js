/* 
 * (C) 2015 TekMonks. All rights reserved.
 * License: MIT - see enclosed LICENSE file.
 */

var fs = require("fs");

function initGlobalLogger() {
	/* create the logger */
	if (!fs.existsSync(CONSTANTS.LOGSDIR)) {fs.mkdirSync(CONSTANTS.LOGSDIR);}
	
	GLOBAL.log = new Logger(CONSTANTS.ACCESSLOG, 100*1024*1024);	// 100 MB log max
	
	log.info("*************************************");
	log.info("*************************************");
	log.info("Logging subsystem initialized.");
}

exports.initGlobalLogger = initGlobalLogger;

Logger = function(path, maxsize) {
	this.path = path;
	this.maxsize = maxsize;
};

Logger.prototype.info = function(s) {Logger.writeFile("info", this.path, s);};

Logger.prototype.debug = function(s) {Logger.writeFile("debug", this.path, s);};

Logger.prototype.error = function(s) {Logger.writeFile("error", this.path, s);};

Logger.writeFile = function(level, path, s) {
	var msg = '{"level":"'+level+'","message":'+JSON.stringify(s)+'}\n';
	fs.appendFile(path, msg, function(err) {
		if (err) { 
			console.log("Logger error!");
			console.log(msg);
		}
	});
};
