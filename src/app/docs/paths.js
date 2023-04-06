const auth = require('./auth');
const cashier = require("./cashiers");
const dashboard = require('./dashboard');
const sales = require('./sales');
const products = require('./products');
const patrimony = require('./patrimony');
const employee = require('./employee');

module.exports = {
    paths:{
        ...auth.paths,
        ...cashier.paths,
        ...sales.paths,
        ...dashboard.paths,
        ...products.paths,
        ...patrimony.paths,
        ...employee.paths
    }
}