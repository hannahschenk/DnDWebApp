const { User, CharacterSheet, Class, Race, AbilityScores, Background, 
    Languages, Proficiencies, Spells, Skills, Equipment, SavingThrows, Items} = require('../models');
const { op } = require('sequelize');
const skills = require('../models/skills');
const savingThrows = require('../models/savingThrows');

const makeObjArray = (objArray, id) => {
    let selectedObj = [];
    for(let i = 0; i < objArray.length; i++) {
        selectedObj.push(
            {CharacterSheetId: id, ...objArray[i] }
        )
    }
    return selectedObj;
}
const makeSavingThrows = (objArray, id) => {
    let selectedObj = [];
    for(let i = 0; i < objArray.length; i++) {
        selectedObj.push(
            {CharacterSheetId: id, name: objArray[i] }
        )
    }
    return selectedObj;
}
//need to change the create and find all to be able to use the logged in users userid
module.exports = {
    create: async (req, res) => {
        const { race, character_class, abilities, proficiencies, background, equipment } = req.body;
        //const userId = {UserId: 1};
        const { languages, characterName, name, url, appearance, personality, alignment, age, height, weight } = background;
    
        try {
            let idOfUser = (await User.findOne({ 
                where: { 
                    authId: req.user.sub
                } 
            })).dataValues.id;
            let newCharacter = (await CharacterSheet.create({ 
                UserId: idOfUser 
            })).dataValues;
            let raceCheck = await Race.create({CharacterSheetId: newCharacter.id, ...race})
            let classCheck = await Class.create({CharacterSheetId: newCharacter.id, ...character_class})
            let abilityScoreCheck = await AbilityScores.create({CharacterSheetId: newCharacter.id, ...abilities})
            let backgroundCheck = await Background.create({CharacterSheetId: newCharacter.id, ...background})
            let languageCheck = await Languages.bulkCreate( makeObjArray(languages, newCharacter.id) )
            let equipmentCheck = await Equipment.bulkCreate( makeObjArray(equipment.total, newCharacter.id))
            let spellCheck = await Spells.bulkCreate(makeObjArray(proficiencies.spells, newCharacter.id))
            let skillCheck = await Skills.bulkCreate(makeObjArray(proficiencies.skills, newCharacter.id))
            let savingThrowCheck = await SavingThrows.bulkCreate(makeSavingThrows(proficiencies.savingThrows, newCharacter.id))
            let itemCheck = await Items.bulkCreate(makeObjArray(proficiencies.items, newCharacter.id))
            

        } catch(err) { 
            //console.log(err)
        }
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