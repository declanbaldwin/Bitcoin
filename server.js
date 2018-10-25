const express = require('express');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const app = express();
const { mongoose } = require('./db/mongoose');
const { Post } = require('./models/posts');

app.use(express.static('public'))
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    Post.find({}).then((posts) => {
        res.render('index', {
            posts: posts
        });
    }).catch((error) => {
        res.status(404).send(error);
    });
});

app.post('/newPost', (req, res) => {
    console.log('newPost');
    console.log(JSON.stringify(req.body));

    let post = new Post(req.body);
    post.save().then((doc) => {
        res.send(doc);
    }).catch((error) => {
        res.status(404).send(error);
    })
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})