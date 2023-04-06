const employee = require("./employee.js");
const employeeById = require("./employeeById.js");

module.exports = {
  paths: {
    "/v2/employee": {
      ...employee,
    },
    "/v2/employee/{id}": {
      ...employeeById,
    },
  },
};
