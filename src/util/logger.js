var log4js = require("log4js");
var config = require("../../config/log4js.json");

log4js.configure(config);
var logger = log4js.getLogger("app");
module.exports = {



  info:function (info) {
    logger.info(info);
  },
  error:function (error) {
    log4js.getLogger("Logs").error(error);
  },
  log:function (log) {
    log4js.getLogger("Logs").log(log)
  }
}
