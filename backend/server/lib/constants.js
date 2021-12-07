/* 
 * (C) 2015 TekMonks. All rights reserved.
 * License: MIT - see enclosed LICENSE file.
 */

const path = require("path");
const rootdir = path.resolve(__dirname+"/../");
const args = require(`${rootdir}/lib/processargs.js`).getArgs();
const confdir = path.resolve(args["c"] || args["conf"] ? (args["c"] || args["conf"])[0] : rootdir+"/conf");

exports.ARGS = args;
exports.ROOTDIR = rootdir;
exports.APPROOTDIR = rootdir + "/../apps";
exports.LIBDIR = rootdir + "/lib";
exports.LOGDIR = rootdir + "/logs";
exports.ACCESSLOG = rootdir+"/logs/server.log.ndjson";
exports.API_REGISTRY = confdir + "/apiregistry.json";
exports.TRANSPORT = confdir + "/transport.json";
exports.CLUSTERCONF = confdir + "/cluster.json";
exports.LOGSCONF = confdir + "/log.json";
exports.LOGMAIN = rootdir + "/logs/server.log.ndjson";
exports.CRYPTCONF = confdir + "/crypt.json";
exports.HTTPDCONF = confdir + "/httpd.json";
exports.IPBLACKLIST = confdir + "/ipblacklist.json";
exports.IPWHITELIST = confdir + "/ipwhitelist.json";
exports.BLACKBOARDCONF = confdir + "/blackboard.json";
exports.GLOBALMEMCONF = confdir + "/blackboard.json";
exports.RELEASEFILE = rootdir + "/../../RELEASE";
exports.MAX_LOG = 1024;

/* Shared namespace */
exports.SHARED_PROC_MEMORY = {};

/* Result objects */
exports.FALSE_RESULT = {"result":false};
exports.TRUE_RESULT = {"result":true};

/* API Manager Constants */
exports.API_MANAGER_HEADERS_KEY = "__org_monkshu_apimanager_headers"
exports.API_MANAGER_DECODERS_CONF = confdir+"/apiregistry.decoders.json";
exports.API_MANAGER_ENCODERS_CONF = confdir+"/apiregistry.encoders.json";
exports.API_MANAGER_SECURITYCHECKERS_CONF = confdir+"/apiregistry.securitycheckers.json";
exports.API_MANAGER_HEADERMANAGERS_CONF = confdir+"/apiregistry.headermanagers.json";
