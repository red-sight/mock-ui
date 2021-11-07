import Collection from "../models/collection";
import Mock from "../models/mock";

async function getAll(req, res) {
  let collections = await Collection.find({ user: req.user._id });
  if (!collections.length)
    collections = [await _initDefaultCollection(req.user._id)];
  res.send(collections);
}

async function getMocks(req, res) {
  const collection = req.params.id;
  const mocks = await Mock.find({
    user: req.user._id,
    collection
  });
  res.send(mocks);
}

async function _initDefaultCollection(user) {
  const localhost = await Collection.create({
    name: "localhost",
    desc: "Example mocking collection",
    baseURL: "http://localhost:3000/",
    user
  });
  const mocks = [
    {
      path: "/bars",
      request: {
        type: "GET"
      },
      response: {
        body: [
          {
            id: "001",
            name: "Bar1"
          },
          {
            id: "002",
            name: "Bar2"
          }
        ]
      },
      desc: "Get all bars",
      user,
      collection: localhost._id
    },

    {
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
    }
  ];

  const res = await Mock.insertMany(mocks);

  return await Collection.findById(localhost._id);
}

module.exports = {
  getAll,
  getMocks
};
