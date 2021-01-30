module.exports = (sequelize, DataTypes) => {
    const Spells = sequelize.define('Spells',{
        //attributes
        name: {
            type: DataTypes.STRING,
        },
        url: {
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