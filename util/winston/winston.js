const logdnaWinston = require("logdna-winston");
const winston = require("winston");

const apiKey = JSON.parse(process.env.LOGDNA_KEY);

module.exports = (opts) => {
  const logger = winston.createLogger({
    transports: [new winston.transports.Console()],
  });

  const options = {
    key: apiKey[0],
    // hostname: myHostname,
    // ip: ipAddress,
    // mac: macAddress,
    app: process.env.APP_NAME,
    env: process.env.NODE_ENV,
    level: "debug", // Default to debug, maximum level of log, doc: https://github.com/winstonjs/winston#logging-levels
    index_meta: true, // Defaults to false, when true ensures meta object will be searchable
    handleExceptions: false, // Only add this line in order to track exceptions
  };

  //add our new instance
  //logger.add(new logdnaWinston({ ...options, ...opts }));

  logger.stream = {
    write: function (message, encoding) {
      //console.log(message);
    },
  };

  return logger;
};

/*
const logger = winston.createLogger({});

const options = {
  key: process.env.LOGDNA_KEY,
  // hostname: myHostname,
  // ip: ipAddress,
  // mac: macAddress,
  app: process.env.APP_NAME,
  env: process.env.NODE_ENV,
  level: "silly", // Default to debug, maximum level of log, doc: https://github.com/winstonjs/winston#logging-levels
  index_meta: true, // Defaults to false, when true ensures meta object will be searchable
  handleExceptions: true // Only add this line in order to track exceptions
};
//add our new instance
logger.add(new logdnaWinston(options));

//module.exports = { logger };


//module.exports = { logger };

//DEFAULT CONSOLE LOGGER
/*const winston = require("winston");

module.exports = { logger };
*/
