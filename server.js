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
    res.render('index');
});

app.post('/newPost', (req, res) => {
    console.log('newPost');
    response.redirect('/');
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})