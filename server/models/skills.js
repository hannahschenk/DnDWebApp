module.exports = (sequelize, DataTypes) => {
    const Skills = sequelize.define('Skills',
      {
        name:{
          type: DataTypes.STRING,
          allowNull: false
        },
        ability:{
          type: DataTypes.STRING,
        },
        origin:{
          type: DataTypes.STRING,
        },
        url:{
          type: DataTypes.STRING,
        },
      }
    );
  
    Skills.associate = ({ CharacterSheet }) => {
      Skills.belongsTo(CharacterSheet);
    };
  
    return Skills;
  };
  