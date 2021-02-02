const express = require('express');
const app = express();
const logger = require('morgan');
const cors = require('cors');

//auth0 api:
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

const jwtCheck = require("./config/jwtConfig");
const {sequelize} = require("./models")
const routeManager = require("./routes/");

const path = require('path'); 
const apiRoutes = "./routes/api.js"

const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: 'http://localhost:1234',
};


app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//end auth0



if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/dist'));
}

//app.use(express.static('client/dist'));

/*app.use("/api", routeManager);
app.use(function (req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});*/
app.use("/", routeManager)

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    //console.log(`API server listening on http://localhost:${PORT}!`);
  });
});