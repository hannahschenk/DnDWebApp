module.exports = (sequelize, DataTypes) => {
    const Proficiencies = sequelize.define('Proficiencies',{
        //attributes
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        index: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.ENUM("skill", "spell", "saving throws"),
        },
        dnd5eEndpoint: {
            type: DataTypes.STRING,
        }
    },
    {
    });
    
    Proficiencies.associate = ({ CharacterSheet }) => {
        Proficiencies.belongsTo(CharacterSheet);
    };
    
    return Proficiencies;
};