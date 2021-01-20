const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = require("https-localhost")() // to get https; change to https on production

const routeManager = require("./routes/");
const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: 'http://localhost:1234',
};

const auth0Config = { 
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'https://localhost:8080/', // this will change in deployment
  clientID: 'H5J4x5gldmMnMfjZBUrqXtPRJDm9dJp4',
  issuerBaseURL: 'https://dnd-capstone.us.auth0.com',
  routes:{
      login: false
  }
};


app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/dist'));
}

app.use("/", routeManager);

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}!`);
});