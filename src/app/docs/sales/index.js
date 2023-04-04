const sales = require("./sales");
const salesbyid = require("./salesbyid");

module.exports = {
    paths:{
        '/v2/sales':{
            ...sales,
        },
        '/v2/sales/{id}':{
            ...salesbyid,
        }
    }    
};