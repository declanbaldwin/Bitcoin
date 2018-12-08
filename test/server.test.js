const { ObjectID } = require("mongodb");
const { app } = require("../server");
const { Post } = require("../models/posts");
const { User } = require("../models/user");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);
chai.should();

beforeEach((done) => {
    Post.remove({}).then(() => done());
});
beforeEach((done) => {
    User.remove({}).then(() => done());
});

describe("POST /posts", () => {
    it("should create a new post", done => {
        chai.request(app)
            .post("/posts")
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

// describe("POST /users", () => {
//     it('should create a new user', done => {
//         chai.request(app)
//             .post('/users')
//             .send({

//             })
//     });
// });
