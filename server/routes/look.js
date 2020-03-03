const express = require('express');
const router = express.Router();
const flash = require('connect-flash');

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

module.exports = router;