const router = require('express').Router();
const userController = require("./../controllers/userController");

/*router.get("/login", (req, res) => {
    res.oidc.login({ returnTo: '/authenticate/userCheck' })
})

router.get("/userCheck", requiresAuth(), (req, res) => {
    userController.create(req.oidc.user)
    .then((user) => res.json(user))
    .catch((error) => res.status(500).json({error}))
})*/

module.exports = router; 