const router = require('express').Router();
const authenticateRoutes = require("./authenticate");
const apiRoutes = require("./api");

const {requiresAuth, auth} = require('express-openid-connect');

router.use("/authenticate", authenticateRoutes);
router.use("/api", apiRoutes)


module.exports = router; 