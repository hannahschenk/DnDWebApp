const { CharacterSheet, Class, Race, AbilityScores, Background, Languages, Proficiencies, Spells, Equipment} = require('../models');
const { op } = require('sequelize');

const makeLanguages = (languages, id) => {
    let lang = [];
    for(let i = 0; i < languages.length; i++) {
        lang.push(
            {CharacterSheetId: id, name: languages[i].name, tableDep: languages[i].origin, dnd5eEndpoint: languages[i].url}
        )
    }
    return lang;
}

const makeEqipment = (equipment, id) => {
    let equip = [];
    for(let i = 0; i < equipment.length; i++) {
        equip.push(
            {CharacterSheetId: id, name: equipment[i].name, type: equipment[i].type, dnd5eEndpoint: equipment[i].url }
        )
    }
    return equip;
}

const makeSpells = (spells, id) => {
    let selectedSpells = [];
    for(let i = 0; i < spells.length; i++) {
        selectedSpells.push(
            {CharacterSheetId: id, name: spells[i].name, type: spells[i].type, dnd5eEndpoint: spells[i].url }
        )
    }
    return selectedSpells;
}

const makeProficiencies = (proficiencies, id) => {
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
            makeSkills(proficiencies[profi], id);
        } else if(profi === 'items') {
            makeItems(proficiencies[profi], id);
        } else if(profi === 'savingThrows') {
            makeSavingThrows(proficiencies[profi], id);
        }
    }

    return prof;
}
//need to change the create and find all to be able to use the logged in users userid
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
    update: (req, res) => {
        const { race, character_class, abilities, proficiencies, background, equipment } = req.body;
        //const userId = {UserId: 1};
        const id = req.params.id;
        const { languages, characterName, name, url, appearance, personality, alignment, age, height, weight } = background;
                try {
                    Race.update({CharacterSheetId: id, ...race}, {
                        where: {CharacterSheetId: id},
                    })
                        .then(() => res.end())
                        .catch((err) => console.log(err));
                    Class.update({CharacterSheetId: id, ...character_class}, {
                        where: {CharacterSheetId: id},
                    })
                        .then(() => res.end())
                        .catch((err) => console.log(err));
                    AbilityScores.update({CharacterSheetId: id, ...abilities}, {
                        where: {CharacterSheetId: id},
                    })
                        .then(() => res.end())
                        .catch((err) => console.log(err));
                    Proficiencies.bulkupdate(makeProficiencies(proficiencies, id), {
                        where: {CharacterSheetId: id},
                    })
                        .then(() => res.end())
                        .catch((err) => console.log(err));
                    Background.update({
                        CharacterSheetId: id,
                        characterName: characterName,
                        name: name, api_endpoint: url,
                        appearance: appearance,
                        personality: personality,
                        alignment: alignment,
                        age: age,
                        height: height,
                        weight: weight
                    }, {
                        where: {CharacterSheetId: id},
                    })
                        .then(() => res.end())
                        .catch((err) => console.log(err));
                    Spells.bulkupdate(makeSpells(proficiencies.spells, id), {
                        where: {CharacterSheetId: id},
                    })
                        .then(() => res.end())
                        .catch((err) => console.log(err));
                    Equipment.bulkupdate( makeEqipment(equipment.total, id), {
                        where: {CharacterSheetId: id},
                    })
                        .then(() => res.end())
                        .catch((err) => console.log(err));
                    Languages.bulkupdate( makeLanguages(languages, id), {
                        where: {CharacterSheetId: id},
                    })
                        .then(() => res.end())
                        .catch((err) => console.log(err));
                } catch(err) { 
                    console.log(err)
                }
    },
    findAll: (req, res) => {
        CharacterSheet.findAll({
            include: [Class, Race, AbilityScores, Background, Languages, Proficiencies, Spells, Equipment],
        }, {
            where: {UserId: 1}
        })
            .then((characterInfo) => res.json(characterInfo))
            .catch((err) => console.log(err));
    },
    findById: (req, res) => {
        const id = req.params.id

        CharacterSheet.findByPk(id, {
            include: [Class, Race, AbilityScores, Background, Languages, Proficiencies, Spells, Equipment],
        })
            .then((characterInfo) => res.json(characterInfo))
            .catch((err) => console.log(err));

    },
    delete: (req, res) => {
        CharacterSheet.destroy({
            where: { id: req.params.id },
        })
            .then(() => res.end())
            .catch((err) => console.log(err));
    }
}