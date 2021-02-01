const { User, CharacterSheet, Class, Race, AbilityScores, Background, 
    Languages, Spells, Skills, Equipment, SavingThrows, Items} = require('../models');
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

let attributesToExlude = ["id", "CharacterSheetId", "createdAt", "updatedAt"];

const getObjectsFromTable = (table, id) => {
    return( 
        table.findAll({
            where: {CharacterSheetId: id},
            attributes:{
                exclude: attributesToExlude
            },
            raw: true,
            nest: true
        })
    )
}
//need to change the create and find all to be able to use the logged in users userid
module.exports = {
    create: async (req, res) => {
        const { race, character_class, abilities, proficiencies, background, equipment } = req.body;
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

            if(newCharacter && raceCheck && classCheck && abilityScoreCheck && 
                backgroundCheck && languageCheck && equipmentCheck && spellCheck && 
                skillCheck && savingThrowCheck && itemCheck){
                    res.send(true)
            }
        } catch(err) { 
            res.status(500).json({err})
        }
    },
    update: async (req, res) => {
        const { race, character_class, abilities, proficiencies, background, equipment } = req.body;
        const { languages, characterName, name, url, appearance, personality, alignment, age, height, weight } = background;
        try {    
            let successDelete = (await CharacterSheet.destroy({
                where: { id: req.params.id },
            }))
            if(successDelete){
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
                if(newCharacter && raceCheck && classCheck && abilityScoreCheck && 
                    backgroundCheck && languageCheck && equipmentCheck && spellCheck && 
                    skillCheck && savingThrowCheck && itemCheck){
                        res.send(true)
                }
            }

        } catch(err) { 
            res.status(500).json({err})
        }
    },
    findAll: async (req, res) => {
        try{
            let idOfUser = (await User.findOne({ 
                where: { 
                    authId: req.user.sub
                } 
            })).dataValues.id;
            
            let characterSheets = (await CharacterSheet.findAll({
                where: {UserId: idOfUser},
                include: [Class, Race, Background],
                raw: true,
                nest: true
            }))

            let formattedCharacterSheets = characterSheets.map((sheet) => {
                return {
                    id: sheet.id,
                    name: sheet.Background.characterName,
                    race: sheet.Race.name,
                    class: sheet.Class.name
                }
            })
            res.json(formattedCharacterSheets)
            
        } catch(err) {
            res.status(500).json({err})
        }
    },
    findById: async(req, res) => {
        try{
            let idOfUser = (await User.findOne({ 
                where: { 
                    authId: req.user.sub
                } 
            })).dataValues.id;
            let characterSheetInfo = (await CharacterSheet.findOne({
                where: {
                    id : req.params.id,
                    userId: idOfUser // conditioning on this because if it doesn't belong to the user, they shouldn't be able to see it
                },
                attributes:["id"],
                include:[
                    {
                        model: Class,
                        attributes:{
                            exclude: attributesToExlude
                        } 
                    },
                    {
                        model: Race,
                        attributes: {
                            exclude:attributesToExlude 
                        }
                    },
                    {
                        model: AbilityScores,
                        attributes:{
                            exclude: attributesToExlude
                        }
                    },
                    {
                        model: Background,
                        attributes:{
                            exclude: attributesToExlude
                        }
                    },
                ],
                raw: true,
                nest: true
            }))

            let characterLanguages = (await getObjectsFromTable(Languages, characterSheetInfo.id))
            let characterSpells = (await getObjectsFromTable(Spells, characterSheetInfo.id))
            let characterSkills = (await getObjectsFromTable(Skills, characterSheetInfo.id))
            let characterEquipment = (await getObjectsFromTable(Equipment, characterSheetInfo.id))
            let characterSavingThrows = (await getObjectsFromTable(SavingThrows, characterSheetInfo.id)).map((content) => content.name)
            let characterItems = (await getObjectsFromTable(Items, characterSheetInfo.id))

            let characterToReturn = {
                race: characterSheetInfo.Race,
                character_class: characterSheetInfo.Class,
                abilities: characterSheetInfo.AbilityScore,
                background: {
                    ...characterSheetInfo.Background,
                    languages: characterLanguages
                },
                proficiencies:{
                    spells: characterSpells,
                    skills: characterSkills,
                    savingThrows: characterSavingThrows,
                    items: characterItems
                },
                equipment: {
                    total: characterEquipment
                }
            }
            res.json(characterToReturn)
        } catch(e){
            res.status(500).json({e})
        }
    },
    delete: (req, res) => {
        CharacterSheet.destroy({
            where: { id: req.params.id },
        })
            .then(() => res.send(true))
            .catch((err) => res.status(500).json({err}));
    }
}