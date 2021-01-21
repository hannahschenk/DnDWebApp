const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = require("https-localhost")() // to get https; change to https on production
const {requiresAuth, auth} = require('express-openid-connect');
const sequelize = require("./models");
const routeManager = require("./routes/");
const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: 'http://localhost:1234',
};

/*       
Auth0 Resources:
https://www.youtube.com/watch?v=QQwo4E_B0y8&t=78s
https://github.com/auth0/express-openid-connect/blob/master/EXAMPLES.md
*/
const auth0Config = { 
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'https://localhost:8080', // this will change in deployment
  clientID: 'H5J4x5gldmMnMfjZBUrqXtPRJDm9dJp4',
  issuerBaseURL: 'https://dnd-capstone.us.auth0.com',
  routes:{
      login: "authenticate/login",
      login: false,
      logout: "authenticate/logout",
      postLogoutRedirect: "/api"
  }
};

app.use(auth(auth0Config)); //attaches /login, /logout, and /callback routes to the baseURL
app.set('trust proxy', true);


app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/dist'));
}

app.use("/", routeManager);

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`API server listening on http://localhost:${PORT}!`);
  });
});