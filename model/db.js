var MongoClient = require('mongodb').MongoClient
  , Db = require('mongodb').Db
  , Server = require('mongodb').Server;


module.exports = new Db('redditclone', new Server('localhost', 27017), {safe: false});
