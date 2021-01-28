module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define( 'User',
        {
            authId:{
                type: DataTypes.STRING,
                allowNull: false
            },
            name:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            email:{
                type: DataTypes.STRING,
                allowNull: false,
            }
        }
    );
  
    User.associate = ({ CharacterSheet }) => {
        User.hasOne(CharacterSheet, {onDelete: "CASCADE"});
    };

    return User;
  };