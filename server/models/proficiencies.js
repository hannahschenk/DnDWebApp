module.exports = (sequelize, DataTypes) => {
    const Proficiencies = sequelize.define('Proficiencies',{
        //attributes
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        origin: {
            type: DataTypes.STRING,
        },
        ability: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.ENUM("skill", "saving throws", "items"),
            allowNull: false
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