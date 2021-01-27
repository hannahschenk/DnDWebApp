const { CharacterSheet, Class, Race, AbilityScores, Background, Languages, Proficiencies, Spells, Equipment} = require('../models');
const { op } = require('sequelize');

const makeLanguages = (languages, newCharacter) => {
    let lang = [];
    for(let i = 0; i < languages.length; i++) {
        lang.push(
            {characterSheet_id: newCharacter.id, name: languages[i].name, tableDep: languages[i].origin, dnd5eEndpoint: languages[i].url}
        )
    }
    return lang;
}

const makeEqipment = (equipment, newCharacter) => {
    let equip = [];
    for(let i = 0; i < equipment.length; i++) {
        equip.push(
            {characterSheet_id: newCharacter.id, name: equipment[i].name, type: equipment[i].type, dnd5eEndpoint: equipment[i].dnd5eEndpoint }
        )
    }
    return equip;
}

const makeSpells = (spells, newCharacter) => {
    let selectedSpells = [];
    for(let i = 0; i < spells.length; i++) {
        selectedSpells.push(
            {characterSheet_id: newCharacter.id, name: spells[i].name, type: spells[i].type, dnd5eEndpoint: spells[i].url }
        )
    }
    return selectedSpells;
}

const makeProficiencies = (proficiencies, newCharacter) => {
    let prof = [];
    for(let i = 0; i < proficiencies.length; i++) {
        prof.push(
            {characterSheet_id: newCharacter.id, name: proficiencies[i].name, type: proficiencies[i].type, dnd5eEndpoint: proficiencies[i].url }
        )
    }
    return prof;
}

module.exports = {
    create: (req, res) => {
        const { race, character_class, abilities, proficiencies, background, equipment } = req.body;
        const { languages, ...back } = background;
        CharacterSheet.create({ userId })
            .then((newCharacter) => {
                try {
                    Race.create({characterSheet_id: newCharacter.id, race})
                    Class.create({characterSheet_id: newCharacter.id, character_class})
                    AbilityScores.create({characterSheet_id: newCharacter.id, abilities})
                    Proficiencies.create(makeProficiencies(proficiencies, newCharacter))
                    Background.create({characterSheet_id: newCharacter.id, ...back})
                    Spells.bulkCreate(makeSpells(proficiencies.spells, newCharacter))
                    Equipment.bulkCreate( makeEqipment(equipment, newCharacter))
                    Languages.bulkCreate( makeLanguages(languages, newCharacter) );
                } catch(err) { 
                    console.log(err)
                }

            })
    }
}