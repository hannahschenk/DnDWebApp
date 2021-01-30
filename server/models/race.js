module.exports = (sequelize, DataTypes) => {
  const Race = sequelize.define('Race',
    {
      name:{
        type: DataTypes.STRING,
        //allowNull: false
      },
      subrace:{
        type: DataTypes.STRING,
      },
      raceUrl:{
        type: DataTypes.STRING,
        //allowNull: false,
      },
      subraceUrl:{
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
