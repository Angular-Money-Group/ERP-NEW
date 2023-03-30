const login = require('./login');
const register = require('./register');
const logout = require('./logout');
const refreshToken = require('./refreshToken');

module.exports = {
    paths:{
        '/v2/auth/login':{
            ...login,
        },
        '/v2/auth/register':{
            ...register,
        },
        '/v2/auth/logout':{
            ...logout,
        },
        '/v2/auth/refreshToken':{
            ...refreshToken,
        }
    }
}