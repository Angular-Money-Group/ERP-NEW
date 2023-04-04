const dashboard = require('./getDashboard');

module.exports = {
    paths:{
        '/v2/dashboard':{
            ...dashboard,
        },
    }
}