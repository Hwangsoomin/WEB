const express = require('express');
const router = express.Router();
const User = require("../models/user");
const mongoose = require('mongoose');
const crypto = require("crypto");

router.post('/nickname',function(req, res, next){
    User.updateOne({email: req.user.email},{$set:{nickname: req.body.nickname}}, function(err, user){
        console.log('닉네임에 들어왔다');
        console.log(req.body);
        if(err){
          console.log(err);
        }
        else {
            req.user.nickname = req.body.nickname;
            res.send('변경되었습니다.');
        }
    });
});

router.post('/password',function(req, res, next){
    User.updateOne({email: req.user.email},{$set:{password: crypto.createHash('sha512').update(req.body.password).digest('base64')}}, function(err, user){
        if(err) console.log(err);
        else res.send('변경되었습니다.');
    })
})
module.exports=router;