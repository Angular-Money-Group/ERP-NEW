const sales = require("./sales");
const salesbyid = require("./salesbyid");

module.exports = {
    ...sales,
    ...salesbyid,
};