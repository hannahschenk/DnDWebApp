const {User} = require("../models");
const { Op } = require("sequelize");

module.exports = {
    create: (userObj) => {
        return( 
            User.findOrCreate({
                where: {
                    authId: userObj.sub,
                }, 
                defaults: {
                    authId: userObj.sub,
                    name: userObj.name,
                    email: userObj.email
                }
            })
        )
    },
}