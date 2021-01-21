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

  return CharacterSheet;
};
