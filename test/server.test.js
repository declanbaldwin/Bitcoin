const { ObjectID } = require("mongodb");
const { app } = require("../server");
const { Post } = require("../models/posts");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);
chai.should();

beforeEach((done) => {
    Post.remove({}).then(() => done());
});

describe("POST /newPost", () => {
    it("should create a new post", done => {
        chai.request(app)
            .post("/newPost")
            .send({
                _method: "post",
                title: "test title",
                postType: "fact",
                text: "test body"
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res).to.have.status(200);

                Post.find({title: "test title"}).then((post) => {
                    expect(post).to.have.lengthOf(1);
                    done();
                }).catch((e) => done(e));
            });
    });
});
