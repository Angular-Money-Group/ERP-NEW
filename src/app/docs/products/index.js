const products = require('./products');
const productsbyid = require('./productsbyid');
const stock = require('./stock');

module.exports = {
    paths: {
        '/v2/products': {
            ...products
        },
        '/v2/products/{id}': {
            ...productsbyid
        },
        '/v2/products/stock': {
            ...stock
        }
    }
}