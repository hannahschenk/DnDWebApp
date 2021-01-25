module.exports = (sequelize, DataTypes) => {
    const Equipment = sequelize.define('Equipment',{
        //attributes
        name: {
            type: DataTypes.STRING,
        },
        index: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.ENUM("armor", "weapons", "tools", "misc"),
        },
        dnd5eEndpoint: {
            type: DataTypes.STRING,
        }
    },
    {
    });
    
    Equipment.associate = ({ CharacterSheet }) => {
        Equipment.belongsTo(CharacterSheet);
    };
    
    return Equipment;
};