const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSChema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
})

userSChema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSChema);