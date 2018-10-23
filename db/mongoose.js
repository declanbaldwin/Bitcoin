const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://databaseUsername:password1@ds135003.mlab.com:35003/heroku_lnnqvh7b');

module.exports = {
    mongoose: mongoose
}