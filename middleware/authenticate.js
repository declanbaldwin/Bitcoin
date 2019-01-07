var { User } = require("../models/user");

var authenticate = (req, res, next) => {
    var {token} = req.cookies;
    if(!token) {
        console.log('no token found');
        res.redirect('/');
    }

    User.findByToken(token)
        .then(user => {
            if (!user) {
                return res.redirect('/');
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