const router = require('express').Router();
const authenticateRoutes = require("./authenticate");
const apiRoutes = require("./api");

router.use("/authenticate", authenticateRoutes);
router.use("/api", apiRoutes)


module.exports = router; 