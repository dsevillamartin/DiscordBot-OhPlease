'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Log = require('../log').Logger;

mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost:27017/OhPlease');
mongoose.connect(process.env.MONGODB || 'mongodb://localhost:27017/OhPlease');

let TagSchema = new Schema({
  name: String,
  content: String,
  author: String
});

let CommandSchema = new Schema({
  command: String,
  content: String,
  description: String,
  guild: String
});

let ServerConfSchema = new Schema({
  name: String,
  commands: Schema.Types.Mixed,
  id: String
});

let Tag = mongoose.model('Tags', TagSchema);
let ServerConf = mongoose.model('ServerConf', ServerConfSchema);




class TagModel {
  constructor(opts = {}) {
    this.tag = opts;
  }
  static Find() {
    return Tag.find({})
  }
  static Get(name) {
    return Tag.findOne({
      name: name
    });
  }
  static Delete(name) {
    return Tag.findOneAndRemove({ name });
  }

  save() {
    return Tag.create(this.tag);
  }
}

class ServerConfModel {
  constructor(opts = {}) {
    this.server_conf = opts;
  }
  static Find() {
    return ServerConf.find({})
  }
  static Get(id) {
    return ServerConf.findOne({
      id: guild_id
    });
  }
  static Delete(id) {
    return ServerConf.findOneAndRemove({ id });
  }

  save() {
    return ServerConf.create(this.server_conf);
  }
}

module.exports = {
  Tag: TagModel,
  ServerConf: ServerConfModel
};
