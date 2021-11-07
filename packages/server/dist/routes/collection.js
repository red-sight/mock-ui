"use strict";

var _collection = _interopRequireDefault(require("../models/collection"));

var _mock = _interopRequireDefault(require("../models/mock"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getAll(req, res) {
  let collections = await _collection.default.find({
    user: req.user._id
  });
  if (!collections.length) collections = [await _initDefaultCollection(req.user._id)];
  res.send(collections);
}

async function getMocks(req, res) {
  const collection = req.params.id;
  const mocks = await _mock.default.find({
    user: req.user._id,
    collection
  });
  res.send(mocks);
}

async function _initDefaultCollection(user) {
  const localhost = await _collection.default.create({
    name: "localhost",
    desc: "Example mocking collection",
    baseURL: "http://localhost:3000/",
    user
  });
  const mocks = [{
    path: "/bars",
    request: {
      type: "GET"
    },
    response: {
      body: [{
        id: "001",
        name: "Bar1"
      }, {
        id: "002",
        name: "Bar2"
      }]
    },
    desc: "Get all bars",
    user,
    collection: localhost._id
  }, {
    path: "/bar",
    request: {
      type: "POST",
      body: {
        name: "New bar"
      }
    },
    response: {
      success: true
    },
    desc: "Add new bar",
    user,
    collection: localhost._id
  }];
  const res = await _mock.default.insertMany(mocks);
  return await _collection.default.findById(localhost._id);
}

module.exports = {
  getAll,
  getMocks
};