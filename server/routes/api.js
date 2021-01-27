const router = require('express').Router();


/* Test Code */
router.get("/", (req, res) => {
    res.setHeader('Content-type','text/html')
    res.send(
        req.oidc.isAuthenticated() ? 
        Buffer.from('<a href="https://localhost:8080/authenticate/logout">logout</a>') : 
        Buffer.from('<a href="https://localhost:8080/authenticate/login">login</a>')
    );
})
/* End test code */


module.exports = router; 