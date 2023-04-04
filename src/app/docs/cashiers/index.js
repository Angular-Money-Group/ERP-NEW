const cashier = require("./cashiers");
const cashiersById = require("./cashiersById");
const cashiersHistoryById = require("./cashiersHistory");
const closeCashier = require("./closeCashier");
const addCash = require("./addCash");
const removeCash = require("./removeCash");

module.exports = {
    paths:{
        '/v2/cashiers':{
            ...cashier,
        },
        "/v2/cashiers/{id}": {
            ...cashiersById,
        },
        "/v2/cashiers/history/{id}": {
            ...cashiersHistoryById,
        },
        "/v2/cashiers/closeCashier/{id}": {
            ...closeCashier,
        },
        "/v2/cashiers/addCash/{id}": {
            ...addCash,
        },
        "/v2/cashiers/removeCash/{id}": {
            ...removeCash,
        }
    }
}