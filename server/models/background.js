module.exports = (sequelize, DataTypes) => {
    const Background = sequelize.define('Background',{
        //attributes
        characterName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING, //"Acolyte", "Criminal/ Spy", "Folk Hero", "Noble", "Sage", "Soldier"
            allowNull: false
        },
        api_endpoint: {
            type: DataTypes.STRING,
            allowNull: false
        },
        appearance: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        personality: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        alignment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.STRING,
        },
        height: {
            type: DataTypes.STRING,
        },
        weight: {
            type: DataTypes.STRING,
        },
        speed: {
            type: DataTypes.INTEGER,
        },
        size: {
            type: DataTypes.ENUM("Small", "Medium", "Large"),
        }
    },
    {
    });
    
    Background.associate = ({ CharacterSheet }) => {
        Background.belongsTo(CharacterSheet);
    };
    
    return Background;
};