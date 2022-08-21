// for local development
const cors = require("cors");

module.exports = function (app) {
  const corsOptions = {
    origin: "http://localhost:3000",
  };

  app.use(cors(corsOptions));
};
