const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const getCurrent = require('./getCurrent');
const updateSubscription = require('./updateSubscription');
const addUserAvatar = require('./addUserAvatar');
const verifyEmail = require('./verifyEmail');
const verifyRepeat = require('./verifyRepeat');

module.exports = {
    signup,
    login,
    logout,
    getCurrent,
    updateSubscription,
    addUserAvatar,
    verifyEmail,
    verifyRepeat
}