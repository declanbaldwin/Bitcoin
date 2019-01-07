require("./config/config");

const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");
const port = process.env.PORT || 3000;
const jwt = require("jsonwebtoken");

const app = express();
const { mongoose } = require("./db/mongoose");
const { Post } = require("./models/posts");
const { User } = require("./models/user");
const { authenticate } = require("./middleware/authenticate");
const cookieParser = require("cookie-parser");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  var { token } = req.cookies;
  var results = {};

  if (!token) {
    Post.find({}).then(posts => {
      return res.render("index", {
        posts: posts,
        token: token
      });
    });
  }

  Post.find({})
    .then(posts => {
      results.posts = posts;
    })
    .then(() => {
      var decoded = jwt.verify(token, process.env.JWT_SECRET);
      return User.findOne({
        _id: decoded._id,
        "tokens.token": token,
        "tokens.access": "auth"
      }).then(user => {
        results.user = user;
      });
    })
    .then(() => {
      return res.render("index", {
        posts: results.posts,
        token: token,
        user: results.user
      });
    })
    .catch(error => {
      res.status(404).send(error);
    });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/logout", authenticate, (req, res) => {
  var { token } = req.cookies;
  if (!token) {
    return res
      .clearCookie("token")
      .status(200)
      .redirect("/");
  }
  req.user
    .removeToken(token)
    .then(() => {
      return res
        .clearCookie("token")
        .status(200)
        .redirect("/");
    })
    .catch(error => {
      res.status(404).send(error);
    });
});

app.get("/posts", (req, res) => {
  Post.find({}).then(
    posts => {
      res.send({ posts });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get("/myposts", authenticate, (req, res) => {
  Post.find({
    _creator: req.user._id
  }).then(
    posts => {
      return res.render("myposts", {
        posts: posts,
        user: req.user
      });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get("/account", authenticate, (req, res) => {
  var { token } = req.cookies;
  var decoded = jwt.verify(token, process.env.JWT_SECRET);
  User.findOne({
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "auth"
  })
    .then(user => {
      return res.render("account", {
        user: user
      });
    })
    .catch(error => {
      res.status(404).send(error);
    });
});

app.get("/posts/:id", (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }

  Post.findOne({
    _id: id
  }).then(post => {
    if (!post) {
      return res.status(400).send();
    }
    res.send({ post });
  });
});

app.post("/posts", authenticate, (req, res) => {
  User.findById(req.user._id)
    .then(user => {
      let post = new Post({
        title: req.body.title,
        postType: req.body.postType,
        author: `${user.firstName} ${user.lastName}`,
        body: req.body.text,
        _creator: req.user._id,
        createdAt: new Date()
      });
      return post.save();
    })
    .then(() => {
      res.redirect("/");
    })
    .catch(error => {
      res.status(404).send(error);
    });
});

app.post("/users", (req, res) => {
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  });

  user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then(token => {
      res
        .status(200)
        .cookie("token", token, { httpOnly: true })
        .redirect("/");
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.post("/users/login", (req, res) => {
  var body = _.pick(req.body, ["email", "password"]);
  User.findByCredentials(body.email, body.password)
    .then(user => {
      return user.generateAuthToken().then(token => {
        res.cookie("token", token, { httpOnly: true }).redirect("/");
      });
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.post("/users/update", authenticate, (req, res) => {
  var body = _.pick(req.body, [
    "firstName",
    "lastName",
    "lastName",
    "email",
    "password"
  ]);

  Object.keys(body).forEach(key => body[key] == "" && delete body[key]);

  var { token } = req.cookies;
  var decoded = jwt.verify(token, process.env.JWT_SECRET);
  User.findOneAndUpdate(
    {
      _id: decoded._id,
      "tokens.token": token,
      "tokens.access": "auth"
    },
    { $set: body },
    { new: true }
  )
    .then(user => {
      if (!user) {
        return res.status(404).send();
      }

      return res.redirect("/");
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.get("/deletePost/:id", authenticate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Post.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  })
    .then(post => {
      if (!post) {
        return res.status(404).send();
      }

      return res.redirect("/myposts");
    })
    .catch(e => {
      res.status(400).send();
    });
});
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

module.exports = { app };
