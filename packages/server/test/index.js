process.env.NODE_ENV = "test";

import chai from "chai";
import chaiHttp from "chai-http";
import server from "../dist/index";
import User from "../dist/models/user";
// const server = "http://localhost:3000";

const should = chai.should();
chai.use(chaiHttp);

const creds = {
  login: "test@email.com",
  password: "Passw0rd."
};

let token;

describe("User auth", () => {
  before(async () => {
    await User.deleteMany({});
  });

  it("Should require initialization if admin doesn't exist", async () => {
    const res = await chai.request(server).get("/init");
    res.body.initRequired.should.equal(true);
  });

  it("Should require initialization for signin method if admin doesn't exist", async () => {
    const res = await chai.request(server).post("/signin").send(creds);
    res.body.initRequired.should.equal(true);
  });

  it("Should perform admin sign up on first launch", async () => {
    const res = await chai.request(server).post("/signup").send(creds);
    res.body.success.should.equal(true);
  });

  it("Restrict to signup admin after the initialization", async () => {
    const res = await chai.request(server).post("/signup").send(creds);
    res.body.success.should.equal(false);
  });

  it("Sign in as admin - not provided creds", async () => {
    const res = await chai.request(server).post("/signin");
    res.body.success.should.equal(false);
    should.not.exist(res.body.token);
  });

  it("Sign in as admin - wrong password", async () => {
    const res = await chai
      .request(server)
      .post("/signin")
      .send({ login: creds.login, password: "Wrong111" });
    res.body.success.should.equal(false);
    should.not.exist(res.body.token);
  });

  it("Sign in as admin", async () => {
    const res = await chai.request(server).post("/signin").send(creds);
    should.exist(res.body.token);
    token = res.body.token;
  });
});
