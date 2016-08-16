'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost:27017/OhPlease');
mongoose.connect(process.env.MONGODB);

let TagSchema = new Schema({
  name: String,
  content: String,
  author: String
});
let Tag = mongoose.model('Tags', TagSchema);


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

module.exports = {
  Tag: TagModel
};
