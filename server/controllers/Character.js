const models = require('../models');

const { Character } = models;

const makerPage = async (req, res) => {
  res.render('app');
};

const makeCharacter = async (req, res) => {
  if (!req.body.name || !req.body.race || !req.body.hair || !req.body.alignment || !req.body.gender || !req.body.skin || !req.body.size || !req.body.height || !req.body.weight || !req.body.faith || !req.body.age) {
    return res.status(400).json({ error: 'Both name, size, and age are required!' });
  }

  const characterData = {
    name: req.body.name,
    race: req.body.race,
    hair: req.body.hair,
    alignment: req.body.alignment,
    gender: req.body.gender,
    skin: req.body.skin,
    size: req.body.size,
    height: req.body.height,
    weight: req.body.weight,
    faith: req.body.faith,
    age: req.body.age,
    owner: req.session.account._id,
  };

  try {
    const newCharacter = new Character(characterData);
    await newCharacter.save();
    return res.status(201).json({ name: newCharacter.name, race: newCharacter.race, hair: newCharacter.hair, alignment: newCharacter.alignment, gender: newCharacter.gender, skin: newCharacter.skin, size: newCharacter.size, height: newCharacter.height, weight: newCharacter.weight, faith: newCharacter.faith, age: newCharacter.age });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'An error occured making a new character!' });
  }
};

const getCharacters = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Character.find(query).select('name race hair alignment gender skin size height weight faith age').lean().exec();

    return res.json({ characters: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving characters!' });
  }
};

module.exports = {
  makerPage,
  makeCharacter,
  getCharacters,
};
