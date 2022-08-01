const winston = require("winston");
const morgan = require("morgan");
const debug = require("debug");
const { format } = require("winston");

module.exports = function (app) {
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  process.on("unhandledRejection", (ex) => {
    //subcribe to uncaught exceptions, will not work with async code though
    throw ex; //which throws an unhandled exception, which will be caught above since winston may not do promise rejections yet
  });

  winston.add(
    new winston.transports.Console({
      colorize: true,
      prettyPrint: true,
      level: "info",
    }),
    new winston.transports.File({ filename: "logfile.log" })
  );

  // can't use when running integration tests
  // winston.add(new winston.transports.MongoDB({
  //     db: 'mongodb://localhost/vidly',
  //     level: 'error', // only error messages will be logged in the db
  //     format: format.metadata() // get the metadata set in the db
  // })); //logs errors to mongodb

  // console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // usually undefined
  // console.log(`ENV: ${app.get('env')}`); // also gets the node env, sets development by default

  // HTTP request logger, only want this on a development machine
  if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    // console.log('morgan enabled');
    debug("morgan enabled"); // only runs when an env variable tells it what we want to debug
  }
};
