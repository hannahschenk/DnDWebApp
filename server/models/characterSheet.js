module.exports = (sequelize, DataTypes) => {
  const CharacterSheet = sequelize.define('CharacterSheet');

  CharacterSheet.associate = ({ Race, Class, Background, Equipment, Spells, Languages, AbilityScores, SavingThrows, Skills, Items }) => {
    CharacterSheet.hasOne(Race, {onDelete: "CASCADE"});
    CharacterSheet.hasOne(Class, {onDelete: "CASCADE"});
    CharacterSheet.hasOne(Background, {onDelete: "CASCADE"});
    CharacterSheet.hasMany(Equipment, {onDelete: "CASCADE"});
    CharacterSheet.hasMany(Spells, {onDelete: "CASCADE"});
    CharacterSheet.hasMany(Languages, {onDelete: "CASCADE"});
    CharacterSheet.hasOne(AbilityScores, {onDelete: "CASCADE"});

    CharacterSheet.hasMany(SavingThrows, {onDelete: "CASCADE"});
    CharacterSheet.hasMany(Skills, {onDelete: "CASCADE"});
    CharacterSheet.hasMany(Items, {onDelete: "CASCADE"});
  };
  

  return CharacterSheet;
}
