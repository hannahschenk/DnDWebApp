const { CharacterSheet, Class, Race, AbilityScores, Background, Languages, Proficiencies, Spells, Equipment} = require('../models');
const { op } = require('sequelize');

module.exports = {
    create: (req, res) => {
        const { race, character_class, abilities, proficiencies, background, equipment } = req.body;
        CharacterSheet.create({ userId })
            .then((newCharacter) => {
                Race.create({characterSheet_id: newCharacter.id, race})
                Class.create({characterSheet_id: newCharacter.id, character_class})
                AbilityScores.create({characterSheet_id: newCharacter.id, abilities})
                Proficiencies.create({characterSheet_id: newCharacter.id, proficiencies})
                Background.create({characterSheet_id: newCharacter.id, background})
                Equipment.create({characterSheet_id: newCharacter.id, equipment})
                Languages.bulkCreate( {characterSheet_id: newCharacter.id, name: race.languages}, {characterSheet_id: newCharacter.id, name: background.languages} );
            })
    }
}