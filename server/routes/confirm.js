const express = require('express');
const router = express.Router();
const User = require("../models/user");

router.get('/',function(req, res, next){
    console.log("들어갑니다!!!!");
    User.updateOne({key_for_verify: req.query.key},{$set: {email_verified: true}}, function(err, user){
      if(err){
        console.log(err);
      }
      else if(user.n == 0){
        res.send('Not verified');
      }
      else{
        res.send('Successfuly verified');
      }
    })
  });

module.exports=router;