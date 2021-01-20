const express = require('express');
const app = express();
const {requiresAuth, auth} = require('express-openid-connect');

/*       
Auth0 Resources:
https://www.youtube.com/watch?v=QQwo4E_B0y8&t=78s
https://github.com/auth0/express-openid-connect/blob/master/EXAMPLES.md
*/

const auth0Config = { 
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'https://localhost:8080/authenticate/', // this will change in deployment
    clientID: 'H5J4x5gldmMnMfjZBUrqXtPRJDm9dJp4',
    issuerBaseURL: 'https://dnd-capstone.us.auth0.com',
    routes:{
        login: false
    }
};

app.use(auth(auth0Config)); //attaches /login, /logout, and /callback routes to the baseURL
app.set('trust proxy', true);



app.get("/", (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send(
        req.oidc.isAuthenticated() ? 
        Buffer.from('<a href="https://localhost:8080/authenticate/logout">logout</a>') : 

        Buffer.from('<a href="https://localhost:8080/authenticate/login">login</a>')

    );
})

app.get("/login", (req, res) => {
    res.oidc.login({ returnTo: '/authenticate/userCheck' })
})

app.get("/userCheck", requiresAuth(), (req, res) => {
    const userInfo = req.oidc.user
    res.send(JSON.stringify(userInfo));
})

module.exports = app; 