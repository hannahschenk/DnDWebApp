const router = require('express').Router();
const {requiresAuth, auth} = require('express-openid-connect');

router.get("/login", (req, res) => {
    res.oidc.login({ returnTo: '/authenticate/userCheck' })
})

router.get("/userCheck", requiresAuth(), (req, res) => {
    userController.create(req.oidc.user)
    .then((user) => res.redirect("/api"))
    .catch((error) => res.status(500).json({error}))
})

module.exports = router; 