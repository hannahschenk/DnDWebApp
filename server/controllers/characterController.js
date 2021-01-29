const { CharacterSheet, Class, Race, AbilityScores, Background, Languages, Proficiencies, Spells, Equipment} = require('../models');
const { op } = require('sequelize');

const makeLanguages = (languages, newCharacter) => {
    let lang = [];
    for(let i = 0; i < languages.length; i++) {
        lang.push(
            {CharacterSheetId: newCharacter.id, name: languages[i].name, tableDep: languages[i].origin, dnd5eEndpoint: languages[i].url}
        )
    }
    return lang;
}

const makeEqipment = (equipment, newCharacter) => {
    let equip = [];
    for(let i = 0; i < equipment.length; i++) {
        equip.push(
            {CharacterSheetId: newCharacter.id, name: equipment[i].name, type: equipment[i].type, dnd5eEndpoint: equipment[i].url }
        )
    }
    return equip;
}

const makeSpells = (spells, newCharacter) => {
    let selectedSpells = [];
    for(let i = 0; i < spells.length; i++) {
        selectedSpells.push(
            {CharacterSheetId: newCharacter.id, name: spells[i].name, type: spells[i].type, dnd5eEndpoint: spells[i].url }
        )
    }
    return selectedSpells;
}

const makeProficiencies = (proficiencies, newCharacter) => {
    let prof = [];

    const makeSkills = (skills, id) => {
        for(let i = 0; i < skills.length; i++) {
            prof.push(
                {CharacterSheetId: id, name: skills[i].name, origin: skills[i].origin, ability: skills[i].ability, type: 'skill', dnd5eEndpoint: skills[i].url }
            )
        }
    }

    const makeItems = (items, id) => {
        for(let i = 0; i < items.length; i++) {
            prof.push(
                {CharacterSheetId: id, name: items[i].name, type: 'items', dnd5eEndpoint: items[i].url }
            )
        }
    }

    const makeSavingThrows = (savingThrows, id) => {
        for(let i = 0; i < savingThrows.length; i++) {
            prof.push(
                {CharacterSheetId: id, name: savingThrows[i].name, type: 'saving throws', dnd5eEndpoint: savingThrows[i].url }
            )
        }
    }

    for(const profi in proficiencies) {
        if(profi === 'skills') {
            makeSkills(proficiencies[profi], newCharacter.id);
        } else if(profi === 'items') {
            makeItems(proficiencies[profi], newCharacter.id);
        } else if(profi === 'savingThrows') {
            makeSavingThrows(proficiencies[profi], newCharacter.id);
        }
    }

    return prof;
}

module.exports = {
    create: (req, res) => {
        const { race, character_class, abilities, proficiencies, background, equipment } = req.body;
        //const userId = {UserId: 1};
        const { languages, characterName, name, url, appearance, personality, alignment, age, height, weight } = background;
        CharacterSheet.create({ UserId: 1 })
            .then((newCharacter) => {
                try {
                    Race.create({CharacterSheetId: newCharacter.id, ...race})
                        .then(() => res.end())
                        .catch((err) => console.log(err));
                    Class.create({CharacterSheetId: newCharacter.id, ...character_class})
                        .then(() => res.end())
                        .catch((err) => console.log(err));
                    AbilityScores.create({CharacterSheetId: newCharacter.id, ...abilities})
                        .then(() => res.end())
                        .catch((err) => console.log(err));
                    Proficiencies.bulkCreate(makeProficiencies(proficiencies, newCharacter))
                        .then(() => res.end())
                        .catch((err) => console.log(err));
                    Background.create({
                        CharacterSheetId: newCharacter.id,
                        characterName: characterName,
                        name: name, api_endpoint: url,
                        appearance: appearance,
                        personality: personality,
                        alignment: alignment,
                        age: age,
                        height: height,
                        weight: weight
                    })
                        .then(() => res.end())
                        .catch((err) => console.log(err));
                    Spells.bulkCreate(makeSpells(proficiencies.spells, newCharacter))
                        .then(() => res.end())
                        .catch((err) => console.log(err));
                    Equipment.bulkCreate( makeEqipment(equipment.total, newCharacter))
                        .then(() => res.end())
                        .catch((err) => console.log(err));
                    Languages.bulkCreate( makeLanguages(languages, newCharacter) )
                        .then(() => res.end())
                        .catch((err) => console.log(err));
                } catch(err) { 
                    console.log(err)
                }

            })
    },
    findAll: (req, res) => {
        CharacterSheet.findAll({
        //include: [Class, Race, AbilityScores, Background, Languages, Proficiencies, Spells, Equipment],
        include:[{model: Class}, {model: Race}, {model: AbilityScores}, {model: Background}, {model: Languages}, {model: Proficiencies}, {model: Spells}, {model: Equipment}, ]
        })
            .then((characterInfo) => res.json(characterInfo))
            .catch((err) => console.log(err));
    },
}