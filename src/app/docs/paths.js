const auth = require('./auth');
const cashier = require("./cashiers");

module.exports = {
    paths:{
        ...auth.paths,
        ...cashier.paths
    }
}