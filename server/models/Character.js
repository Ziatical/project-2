const mongoose = require('mongoose');
const _ = require('underscore');

const setName = (name) => _.escape(name).trim();

// name, race, hair, alignment, gender, skin, size, height, weight, faith, age
const CharacterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  race: {
    type: String,
    required: true,
  },
  hair: {
    type: String,
    required: true,
  },
  alignment: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  skin: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    min: 1,
    required: true,
  },
  weight: {
    type: Number,
    min: 1,
    required: true,
  },
  faith: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 0,
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

CharacterSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  race: doc.race,
  hair: doc.hair,
  alignment: doc.alignment,
  gender: doc.gender,
  skin: doc.skin,
  size: doc.size,
  height: doc.height,
  weight: doc.weight,
  faith: doc.faith,
  age: doc.age,
});

const CharacterModel = mongoose.model('Character', CharacterSchema);
module.exports = CharacterModel;