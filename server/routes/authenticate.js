const router = require('express').Router();
const {requiresAuth, auth} = require('express-openid-connect');

router.get("/login", (req, res) => {
    res.oidc.login({ returnTo: '/authenticate/userCheck' })
})

router.get("/userCheck", requiresAuth(), (req, res) => {
    // we'll put the function to find/create a user here
    
    /*
    const userInfo = req.oidc.user
    //userInfo.sub => I think we can use this for the userId
    res.send(JSON.stringify(userInfo));
    //my google id: "sub":"google-oauth2|107049746498959360476"    
    */

    //redirect user once we are done
    res.redirect("/api")
})

module.exports = router; 