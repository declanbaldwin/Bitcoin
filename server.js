require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const port = process.env.PORT || 3000;

const app = express();
const { mongoose } = require('./db/mongoose');
const { Post } = require('./models/posts');
const { User } = require('./models/user');
const {authenticate} = require('./middleware/authenticate');
const cookieParser = require('cookie-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    var {token} = req.cookies;
    Post.find({}).then((posts) => {
        res.render('index', {
            posts: posts,
            token: token
        });
    }).catch((error) => {
        res.status(404).send(error);
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/logout', (req, res) => {
    var {token} = req.cookies;

    User.findByToken(token)
        .then(user => {
            if (!user) {
                res.clearCookie('token').redirect('/');
            }
            user.token = null;
            res.clearCookie('token').redirect('/');
        }).catch(e => {
            res.status(401).send();
        });
        
});

app.get('/posts', (req, res) => {
    Post.find({}).then((posts) => {
        res.send({posts});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/posts/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(400).send();
    }

    Post.findOne({
        _id:id
    }).then((post) => {
        if(!post) {
            return res.status(400).send();
        } 
        res.send({post});
    });
});

app.post('/posts', authenticate, (req, res) => {
    
    let post = new Post({
        title: req.body.title,
        postType: req.body.postType,
        _creator: req.user._id,
        body: req.body.text,
        createdAt: new Date()
    });
    post.save().then((doc) => {
        res.redirect('/');
    }).catch((error) => {
        res.status(404).send(error);
    });
});

app.post('/users', (req, res) => {
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.status(200).cookie('token', token).redirect('/');
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.status(200).cookie('token', token).redirect('/');
        });
    }).catch((e) => {
        res.status(400).send(); 
    });
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});

module.exports = { app };