module.exports = (sequelize, DataTypes) => {
    const Languages = sequelize.define('Languages',{
        //attributes
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        origin: {
            type: DataTypes.STRING,
        },
        url: {
            type: DataTypes.STRING,
        }
    },
    {
    });
    
    Languages.associate = ({ CharacterSheet }) => {
        Languages.belongsTo(CharacterSheet);
    };
    
    return Languages;
};