const router = require('express').Router();
const apiRoutes = require("./api");
const jwtCheck = require("./../config/jwtConfig");

router.use("/api", jwtCheck, apiRoutes)


module.exports = router; 