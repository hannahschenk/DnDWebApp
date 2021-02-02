const router = require('express').Router();
const apiRoutes = require("./api");

const path = require('path'); 
//const jwtCheck = require("./../config/jwtConfig");

router.use("/api", apiRoutes)

/*router.use("*", function (req, res) {
  res.sendFile('index.html');
});*/
router.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../..', 'client', 'dist', 'index.html'));
});
module.exports = router; 