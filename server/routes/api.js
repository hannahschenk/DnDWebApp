const router = require('express').Router();
const characterController = require('../controllers/characterController.js')

const jwtCheck = require("./../config/jwtConfig");
const jwtAuthz = require('express-jwt-authz');
var jwt = require('express-jwt');
const userController = require("./../controllers/userController");


//comment these out if you want to use authentication.
router.route("/character")
    .get(characterController.findAll)
    .post(characterController.create);

router.route("/character/:id")
    .put(characterController.update)
    .get(characterController.findById)
    .delete(characterController.delete);


router.post("/user", jwtCheck, (req, res) => {
    let userObj = {
        sub: req.user.sub,
        name: req.body.name, 
        email: req.body.email
    }
    userController.create(userObj)
    .then((user) => res.json(user))
    .catch((error) => res.status(500).json({error}))
  });
  

module.exports = router; 