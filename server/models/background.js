module.exports = (sequelize, DataTypes) => {
    const Background = sequelize.define('Background',{
        //attributes
        name: {
            type: DataTypes.STRING,
        },
        background_feature: {
            type: DataTypes.STRING,
        },
        api_endpoint: {
            type: DataTypes.STRING,
        },
        appearance: {
            type: DataTypes.TEXT,
        },
        personality: {
            type: DataTypes.TEXT,
        },
        alignment: {
            type: DataTypes.STRING,
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
        },
        type: {
            type: DataTypes.ENUM("Acolyte", "Criminal/ Spy", "Folk Hero", "Noble", "Sage", "Soldier"),
        },
        api_endpoint: {
            type: DataTypes.STRING,
        }
    },
    {
    });
    
    Background.associate = ({ CharacterSheet }) => {
        Background.belongsTo(CharacterSheet);
    };
    
    return Background;
};