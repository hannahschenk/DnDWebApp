module.exports = (sequelize, DataTypes) => {
  const CharacterSheet = sequelize.define('CharacterSheet');

  CharacterSheet.associate = ({ User }) => {
    CharacterSheet.belongsTo(User);
  };

  CharacterSheet.associate = ({ Race }) => {
    CharacterSheet.hasOne(Race, {onDelete: "CASCADE"});
  };

  return CharacterSheet;
};
