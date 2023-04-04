const patrimony = require('./patrimony');
const patrimonysbyid = require('./patrimonybyid');

module.exports = {
    paths: {
        '/v2/patrimony': {
            ...patrimony
        },
        '/v2/patrimony/{id}': {
            ...patrimonysbyid
        },
    }
}