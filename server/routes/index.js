const router = require('express').Router();
const authenticateRoutes = require("./authenticate");
const apiRoutes = require("./api");
const jwtCheck = require("./../config/jwtConfig");

router.use("/authenticate", authenticateRoutes);
router.use("/api", jwtCheck, apiRoutes)


module.exports = router; 