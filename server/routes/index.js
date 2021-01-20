const router = require('express').Router();
const authenticateRoutes = require("./authenticate");

const {requiresAuth, auth} = require('express-openid-connect');


router.use("/authenticate", authenticateRoutes);
router.get("/", (req, res) => res.send("this is the server root"))


router.get("/test-auth", requiresAuth(), (req, res) => {
    res.send("dsfasdf");
})

module.exports = router; 