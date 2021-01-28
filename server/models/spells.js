module.exports = (sequelize, DataTypes) => {
    const Spells = sequelize.define('Spells',{
        //attributes
        name: {
            type: DataTypes.STRING,
        },
        index: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.ENUM("cantrip", "spell"),
        },
        dnd5eEndpoint: {
            type: DataTypes.STRING,
        }
    },
    {
    });
    
    Spells.associate = ({ CharacterSheet }) => {
        Spells.belongsTo(CharacterSheet);
    };
    
    return Spells;
};