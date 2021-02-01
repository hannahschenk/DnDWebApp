module.exports = (sequelize, DataTypes) => {
    const Items = sequelize.define('Items',
      {
        name:{
          type: DataTypes.STRING,
          allowNull: false
        },
        origin:{
          type: DataTypes.STRING,
        },
        url:{
          type: DataTypes.STRING,
        },
      }
    );
  
    Items.associate = ({ CharacterSheet }) => {
      Items.belongsTo(CharacterSheet);
    };
  
    return Items;
  };
  