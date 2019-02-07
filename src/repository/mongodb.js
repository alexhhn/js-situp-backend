const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/situp";

let database = null;
let connecting = false;

let callbacks = [];

exports.getConnection = () => {
  return new Promise((resolve, reject) => {
    if (database == null && !connecting) {
      connecting = true;
      MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        console.log("Database created!");
        database = db;
        resolve(database);
        callbacks.forEach(func => func());
      });
    } else if (database != null) {
      resolve(database);
    } else {
      callbacks.push(() => {
        resolve(database);
      });
    }
  });
};
