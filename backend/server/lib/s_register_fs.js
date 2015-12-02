/* 
 * (C) 2015 TekMonks. All rights reserved.
 * License: MIT - see enclosed LICENSE file.
 */

var fs = require("fs");

exports.doService = doService;

function doService(jsonReq, callback) {
	
	if (!validateRequest(jsonReq, callback)) return;
	
	log.info("Got register request for new ID: " + jsonReq.user);
	
	fs.readFile(CONSTANTS.USERS_FILE, function(err, data) {
		if (!err) {
			if (!stringArrayContainsIgnoreCase(JSON.parse(data), jsonReq.user)) {
				registerUser(jsonReq.id, jsonReq.user, JSON.parse(data), callback);
			}
			else {
				var resp = {}; resp["result"] = false;
				log.info("Registration result: ID already exists.");
				callback(resp);
				return;
			}
		} else {
			log.error("Couldn't read users file. Possible corruption. Error is: " + err);
			log.info("Registering anyway");
			registerUser(jsonReq.id, jsonReq.user, [], callback);
		}
	});	
}

function validateRequest(jsonReq, callback) {
	if ((jsonReq == null) || (jsonReq.id == null) || (jsonReq.user == null)) {
		var resp = {}; resp["result"] = false;
		log.info("Invalid ID or hash.");
		callback(resp);
		return false;
	}
	
	return true;
}

function registerUser(id, user, users, callback) {
	var dirToCheck = require(CONSTANTS.LIBDIR+"/userid.js").getUserPath(id);
	
	fs.exists(dirToCheck, function(exists) {
		if (exists) {
			var resp = {}; resp["result"] = false;
			log.info("Registration result: ID already exists.");
			callback(resp);
			return;
		} else {
			fs.mkdir(dirToCheck, function(err){
				if (err) {
					var resp = {}; resp["result"] = false;
					log.info("Registration result: Failed to create directory.");
					callback(resp);
					return;
				} else addUserToUsersDBAndRegister(user, users, callback);
			});
		}
	});
}

function addUserToUsersDBAndRegister(user, users, callback) {
	users.push(user);
	fs.writeFile(CONSTANTS.USERS_FILE, JSON.stringify(users), function(err) {
		var resp = {}; resp["result"] = true;
		log.info("Registration result: Success.");
		callback(resp);
	});
};

function stringArrayContainsIgnoreCase(array, string) {
	if (array == null) return false;
	
	for (var i = 0; i < array.length; i++)
		if (array[i].toLowerCase() == string.toLowerCase()) return true;
	
	return false;
}