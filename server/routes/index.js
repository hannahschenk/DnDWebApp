const router = require('express').Router();
const apiRoutes = require("./api");
const jwtCheck = require("./../config/jwtConfig");

//router.use("/api", jwtCheck, apiRoutes)
/*router.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../..', 'client', 'dist', 'index.html'));
  });*/
module.exports = router; 