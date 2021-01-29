module.exports = (sequelize, DataTypes) => {
  const CharacterSheet = sequelize.define('CharacterSheet');

  CharacterSheet.associate = ({ Race, Class, Proficiencies, Background, Equipment, Spells, Languages, AbilityScores }) => {
    CharacterSheet.hasOne(Race, {onDelete: "CASCADE"});
    CharacterSheet.hasOne(Class, {onDelete: "CASCADE"});
    CharacterSheet.hasMany(Proficiencies, {onDelete: "CASCADE"});
    CharacterSheet.hasOne(Background, {onDelete: "CASCADE"});
    CharacterSheet.hasMany(Equipment, {onDelete: "CASCADE"});
    CharacterSheet.hasMany(Spells, {onDelete: "CASCADE"});
    CharacterSheet.hasMany(Languages, {onDelete: "CASCADE"});
    CharacterSheet.hasOne(AbilityScores, {onDelete: "CASCADE"});
  };
  

  return CharacterSheet;
}
