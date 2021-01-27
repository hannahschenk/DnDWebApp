module.exports = (sequelize, DataTypes) => {
    const Languages = sequelize.define('Languages',{
        //attributes
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tableDep: {
            type: DataTypes.STRING,
        },
        dnd5eEndpoint: {
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