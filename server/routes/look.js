const express = require('express');
const router = express.Router();
const flash = require('connect-flash');

router.get('/flash',function(req,res,next){
    res.send(req.flash('login_message')[0]);
});
router.get('/email',function(req,res,next){
    res.send(req.user.email);
});

module.exports = router;