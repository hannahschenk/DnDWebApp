module.exports = (sequelize, DataTypes) => {
  const Race = sequelize.define('Race',
    {
      parentRace:{
        type: DataTypes.STRING,
        //allowNull: false
      },
      subRace:{
        type: DataTypes.STRING,
      },
      raceUrl:{
        type: DataTypes.STRING,
        //allowNull: false,
      },
      subRaceUrl:{
        type: DataTypes.STRING,
      },
      speed: {
        type: DataTypes.INTEGER,
      },
      size: {
        type: DataTypes.ENUM("Small", "Medium", "Large"),
      }
    }
  );

  Race.associate = ({ CharacterSheet }) => {
    Race.belongsTo(CharacterSheet);
  };

  return Race;
};
