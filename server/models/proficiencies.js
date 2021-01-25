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
            type: DataTypes.ENUM,
        },
        dnd5eEndpoint: {
            type: DataTypes.STRING,
        }
    },
    {
    });
    
    Proficiencies.associate = ({ characterSheet }) => {
        Books.belongsTo(characterSheet);
    };
    
    return Books;
};