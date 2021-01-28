module.exports = (sequelize, DataTypes) => {
    const Equipment = sequelize.define('Equipment',{
        //attributes
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM("armor", "weapons", "tools", "misc"),
            allowNull: false
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