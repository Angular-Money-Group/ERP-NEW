const auth = require('./auth');
const cashier = require("./cashiers");
const dashboard = require('./dashboard');
const sales = require('./sales');

module.exports = {
    paths:{
        ...auth.paths,
        ...cashier.paths,
        ...dashboard.paths,
        ...sales.paths,
    }
}