const router = require('express').Router();
const apiRoutes = require("./api");

const path = require('path'); 
//const jwtCheck = require("./../config/jwtConfig");

router.use("/api", apiRoutes)

router.use(function (req, res) {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});
console.log(__dirname)
module.exports = router; 