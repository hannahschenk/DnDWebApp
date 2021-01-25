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
            type: DataTypes.ENUM,
        },
        type: {
            type: DataTypes.ENUM,
        },
        api_endpoint: {
            type: DataTypes.STRING,
        }
    },
    {
    });
    
    Background.associate = ({ characterSheet }) => {
        Background.belongsTo(characterSheet);
    };
    
    return Background;
};