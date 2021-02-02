const router = require('express').Router();
const apiRoutes = require("./api");
//const jwtCheck = require("./../config/jwtConfig");

//router.use("/api", apiRoutes)

router.use(function (req, res) {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});
module.exports = router; 