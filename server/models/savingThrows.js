module.exports = (sequelize, DataTypes) => {
    const SavingThrows = sequelize.define('SavingThrows',
      {
        name:{
          type: DataTypes.STRING,
          allowNull: false
        },
      }
    );
  
    SavingThrows.associate = ({ CharacterSheet }) => {
      SavingThrows.belongsTo(CharacterSheet);
    };
  
    return SavingThrows;
  };
  