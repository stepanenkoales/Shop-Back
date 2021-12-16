const pino = require("pino");
const pinoLogger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    
    },
  },
});

class Logger {
  constructor(pinoLogger) {
    this.logger = pinoLogger;
  }

  info(message) {
    this.logger.info(message);
  }
  warn(message) {
    this.logger.warn(message);
  }
  error(message) {
    this.logger.error(message);
  }
}

const logger = new Logger(pinoLogger);
module.exports = logger;
