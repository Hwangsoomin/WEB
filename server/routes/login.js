const express = require('express');
const router = express.Router();
const User = require("../models/user");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const crypto = require("crypto");

passport.serializeUser(function(user,done){
    done(null, user);
  });
  passport.deserializeUser(function(user, done){
    done(null,user);
  });
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
    function(req, email, password, done){
      User.findOne({email: email, password: crypto.createHash('sha512').update(password).digest('base64'), email_verified: true}, function(err,user){
        if(err){
          throw err;
        }else if(!user){
          return done(null, false, req.flash('login_message','이메일 또는 비밀번호를 확인하세요'));
        }else{
          return done(null, user);
        }
      })
    }
  ));
  router.post('/', passport.authenticate('local',{failureRedirect: '/login', failureFlash: true}),
  function(req, res){
    const Uemail= req.body.email;
    res.redirect('/');
});

module.exports = router;