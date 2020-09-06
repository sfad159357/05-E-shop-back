const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");
const MongoClient = require("mongodb").MongoClient;

module.exports = function () {
  var uri =
    "mongodb://sfad159357:753951sfad@cluster0-shard-00-00.rjrvl.gcp.mongodb.net:27017/vidly";
  MongoClient.connect(uri, function (err, client) {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
  });

  const db = config.get("db");
  mongoose.connect(db).then(() => winston.info(`Connected to ${db}...`));
};
