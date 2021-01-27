module.exports = (sequelize, DataTypes) => {
    const AbilityScores = sequelize.define(
      'AbilityScores',
      {
        strength:{
          type: DataTypes.INTEGER,
          allowNull: false,
          validate:{
              min: 1 
          }
        },
        dexterity:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                min: 1 
            }
        },
        constitution:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                min: 1 
            }
        },
        intelligence:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                min: 1 
            }
        },
        wisdom:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                min: 1 
            }
        },
        charisma:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                min: 1 
            }
        }
      }
    );
  
    AbilityScores.associate = ({ CharacterSheet }) => {
      AbilityScores.belongsTo(CharacterSheet);
    };
  
    return AbilityScores;
  };
  