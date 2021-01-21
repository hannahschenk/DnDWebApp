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
  
    return User;
  };