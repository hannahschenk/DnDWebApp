const router = require('express').Router();
const {requiresAuth, auth} = require('express-openid-connect');
const characterController = require('../controllers/characterController.js')

/* Test Code */
router.get("/", (req, res) => {
    res.setHeader('Content-type','text/html')
    res.send(
        req.oidc.isAuthenticated() ? 
        Buffer.from('<a href="https://localhost:8080/authenticate/logout">logout</a>') : 
        Buffer.from('<a href="https://localhost:8080/authenticate/login">login</a>')
    );
})


/*
    These api calls require authorization so if the user is not logged in, 
    it would prompt them to do so before they can access the api;
    if the user is logged in, you can access req.oidc.user.sub and use that 
    to get userId
*/

// router.get("/character", requiresAuth(), (req, res) => {
//     res.send(req.oidc.user.sub) // this is the user id saved in db
// })

router.route("/character")
    .get(characterController.findAll);

router.get("/character/:id", requiresAuth(), (req, res) => {})
router.route("/character")
    .post(characterController.create);
//router.post("/character", requiresAuth(), (req, res) => {})
router.put("/character/:id", requiresAuth(), (req, res) => {})
router.delete("/character/:id", requiresAuth(), (req, res) => {})
/* End test code */


module.exports = router; 