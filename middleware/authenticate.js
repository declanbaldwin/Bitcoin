var { User } = require("../models/user");

var authenticate = (req, res, next) => {
    var {token} = req.cookies;
    User.findByToken(token)
        .then(user => {
            if (!user) {
                return Promise.reject("unable to find user");
            }
            req.user = user;
            req.token = token;
            next();
        })
        .catch(e => {
            res.status(401).send();
        });
};

module.exports = {
    authenticate
};