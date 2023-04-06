const clients = require("./clients");
const clientsById = require("./clientsById");

module.exports = {
  paths: {
    "/v2/clients": {
      ...clients,
      ...clientsById,
    },
  },
};
