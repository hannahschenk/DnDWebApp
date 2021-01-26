module.exports = (sequelize, DataTypes) => {
  const CharacterSheet = sequelize.define('CharacterSheet');

  CharacterSheet.associate = ({ User }) => {
    CharacterSheet.belongsTo(User);
  };

  /*models belonging to character sheet*/
  CharacterSheet.associate = ({ Race }) => {
    CharacterSheet.hasOne(Race, {onDelete: "CASCADE"});
  };
  
  CharacterSheet.associate = ({ Class }) => {
    CharacterSheet.hasOne(Class, {onDelete: "CASCADE"});
  };

  CharacterSheet.associate = ({ Proficiencies }) => {
    CharacterSheet.hasMany(Proficiencies, {onDelete: "CASCADE"});
  };

  CharacterSheet.associate = ({ Background }) => {
    CharacterSheet.hasOne(Background, {onDelete: "CASCADE"});
  };
  CharacterSheet.associate = ({ Equipment }) => {
    CharacterSheet.hasMany(Equipment, {onDelete: "CASCADE"});
  };

  CharacterSheet.associate = ({ Spells }) => {
    CharacterSheet.hasMany(Spells, {onDelete: "CASCADE"});
  };

  CharacterSheet.associate = ({ Languages }) => {
    CharacterSheet.hasMany(Languages, {onDelete: "CASCADE"});
  };
  

  return CharacterSheet;
}
