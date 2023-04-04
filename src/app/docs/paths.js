const auth = require('./auth');
const cashier = require("./cashiers");
const dashboard = require('./dashboard');

module.exports = {
    paths:{
        ...auth.paths,
        ...cashier.paths,
        ...dashboard.paths,
    }
}