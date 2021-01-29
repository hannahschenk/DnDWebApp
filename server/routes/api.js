const router = require('express').Router();

const jwtCheck = require("./../config/jwtConfig");
const jwtAuthz = require('express-jwt-authz');
var jwt = require('express-jwt');
const userController = require("./../controllers/userController");
//const {requiresAuth, auth} = require('express-openid-connect');

/* Test Code 
router.get("/", (req, res) => {
    res.setHeader('Content-type','text/html')
    res.send(
        req.oidc.isAuthenticated() ? 
        Buffer.from('<a href="https://localhost:8080/authenticate/logout">logout</a>') : 
        Buffer.from('<a href="https://localhost:8080/authenticate/login">login</a>')
    );
})
*/


/*
    These api calls require authorization so if the user is not logged in, 
    it would prompt them to do so before they can access the api;
    if the user is logged in, you can access req.oidc.user.sub and use that 
    to get userId
*/
/*router.get("/character", requiresAuth(), (req, res) => {
    res.send(req.oidc.user.sub) // this is the user id saved in db
})
router.get("/character/:id", requiresAuth(), (req, res) => {})
router.post("/character", requiresAuth(), (req, res) => {})
router.put("/character/:id", requiresAuth(), (req, res) => {})
router.delete("/character/:id", requiresAuth(), (req, res) => {})
*/
/* End test code */



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