const express = require('express');
const router = express.Router();
const flash = require('connect-flash');
const crypto = require("crypto");

router.get('/flash',function(req,res,next){
    res.send(req.flash('login_message')[0]);
});

router.get('/email',function(req,res,next){
    if(req.user && req.user.email) res.send(req.user.email);
    else res.send('');
});

router.get('/login',function(req,res,next){
    if(req.user) res.send(req.user);
    else res.send('');
});

router.get('/all',function(req, res, next){
    console.log(req.user);
    if(req.user) res.send(req.user);
    else res.send(false);
});

router.post('/pass',function(req, res, next){
    console.log(req.body);
    var pass = crypto.createHash('sha512').update(req.body.pass).digest('base64');
    if(req.user.password === pass)res.send(true);
    else res.send(false);
})
module.exports = router;