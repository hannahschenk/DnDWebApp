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
const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: 'http://localhost:1234',
};


app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(jwtCheck);
//end auth0



if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/dist'));
}

app.use("/", routeManager);

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`API server listening on http://localhost:${PORT}!`);
  });
});