const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");
const MongoClient = require("mongodb").MongoClient;

module.exports = function () {
  const uri =
    "mongodb+srv://sfad159357:753951sfad@cluster0.rjrvl.gcp.mongodb.net/vidly_db?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((err) => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
  });

  const db = config.get("db");
  mongoose.connect(db).then(() => winston.info(`Connected to ${db}...`));
};
