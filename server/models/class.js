module.exports = (sequelize, DataTypes) => {
    const Class = sequelize.define(
      'Class',
      {
        name:{
          type: DataTypes.STRING,
          allowNull: false
        },
        classUrl:{
            type: DataTypes.STRING,
            allowNull: false
        }
      }
    );
  
    Class.associate = ({ CharacterSheet }) => {
      Class.belongsTo(CharacterSheet);
    };
  
    return Class;
  };
  