let chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../index");

//Assertion style
chai.should();
chai.use(chaiHttp);

var baseUrl = "http://http://localhost:3001/";
let token = "";

describe("seller tests", () => {
  it("should return token", (done) => {
    const user = {
      seller_email: "saikumar@gmail.com",
      seller_password: "12345678",
    };
    chai
      .request(server)
      .post("/seller/signin")
      .send(user)
      .end((err, response) => {
        response.body.should.have.property("token");
        token = response.body.token;
        done();
      });
  });

  it("should return dishes", (done) => {
    let r = {
      rid: 16,
    };
    console.log(token);
    chai
      .request(server)
      .post("/seller/getdishes")
      .auth(token, { type: "bearer" })
      .send(r)
      .end((err, response) => {
        response.body.should.have.property("dishes");
        done();
      });
  });
  it("should return seller order", (done) => {
    const p = {
      rid: 16,
    };
    chai
      .request(server)
      .post("/seller/orders")
      .auth(token, { type: "bearer" })
      .send(p)
      .end((err, response) => {
        response.body.should.have.property("orders");

        done();
      });
  });
  it("should return get dishes", (done) => {
    const p = {
      rid: 16,
    };
    chai
      .request(server)
      .post("/seller/getdishes")
      .auth(token, { type: "bearer" })
      .send(p)
      .end((err, response) => {
        response.body.should.have.property("dishes");

        done();
      });
  });
  it("should return delete dishes", (done) => {
    const p = {
      dish_id: "4",
    };
    chai
      .request(server)
      .post("/seller/deletedish")
      .auth(token, { type: "bearer" })
      .send(p)
      .end((err, response) => {
        response.body.should.have.property("success");

        done();
      });
  });
});
