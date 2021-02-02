module.exports = (sequelize, DataTypes) => {
    const Class = sequelize.define('Class',
      {
        name:{
          type: DataTypes.STRING,
          allowNull: false
        },
        url:{
            type: DataTypes.STRING,
            allowNull: false
        },
        hitDie:{
          type: DataTypes.INTEGER,
        },
        totalHP:{
          type: DataTypes.INTEGER,
        }
      }
    );
  
    Class.associate = ({ CharacterSheet }) => {
      Class.belongsTo(CharacterSheet);
    };
  
    return Class;
  };
  