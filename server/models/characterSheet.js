module.exports = (sequelize, DataTypes) => {
  const CharacterSheet = sequelize.define('CharacterSheet');

  CharacterSheet.associate = ({ User }) => {
    CharacterSheet.belongsTo(User);
  };

  return CharacterSheet;
};
