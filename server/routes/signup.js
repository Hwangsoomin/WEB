const express = require('express');
const router = express.Router();
const User = require("../models/user");
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var nodemailer = require('nodemailer');
const crypto = require("crypto");
var smtpTransporter = require('nodemailer-smtp-transport');

var key_one = crypto.randomBytes(256).toString('hex').substr(100, 5);
var key_two = crypto.randomBytes(256).toString('base64').substr(50, 5);
var key_for_verify = key_one + key_two;

var smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'youremail',
    pass: 'yourpass'
  }
});

/*router.post("/", function(req, res, next){//이메일 번호인증
  const user = new User({
    _id:new mongoose.Types.ObjectId(),
    name:req.body.name,
    email:req.body.email,
    email_verified: true,
    password:crypto.createHash('sha512').update(req.body.password).digest('base64'),
    key_for_verify: key_for_verify
  });
  user
    .save()
    .then(result => {
      console.log(result);
      res.send('회원가입이 완료되었습니다. 축하드립니다!');
      })
    .catch(err => {
      console.log(err);
      });
  });*/
router.post("/", (req, res, next) => {
  /*console.log(req.body);
  var ev = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var unv = /^.{3,12}$/;
  var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
  var errors = {};
  if(!ev.test(req.body.email)) errors.email='Should be a vaild email address!';
  if(!unv.test(req.body.name)) errors.name='Should be 3-12 characters!';
  if(!re.test(req.body.password))errors.password='Should be minimum 8 characters of alphabet and number combination!';
  console.log(errors);
  console.log(errors.length);
  if(Object.keys(errors).length !== 0 )res.send({errors:errors, number:1});*/
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        res.send('<script type="text/javascript">alert("이미 존재하는 이메일입니다.");window.location="/signUp";</script>');
        //res.send({errors:errors, number:2});
      } else {
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          email: req.body.email,
          password: crypto.createHash('sha512').update(req.body.password).digest('base64'),
          key_for_verify: key_for_verify
        });
        user
          .save()
          .then(result => {
            console.log(result);
            var url = 'http://' + req.get('host') + '/confirmEmail' + '?key=' + key_for_verify;
            var mailOpt = {
              from: 'maum9709@gmail.com',
              to: user.email,
              subject: '이메일 인증을 진행해주세요.',
              html: url
            };
            smtpTransport.sendMail(mailOpt, function (err, res) {
              if (err) {
                console.log(err);
              } else {
                console.log('email has been sent');
              }
              smtpTransport.close();
            });
            res.send('<script type="text/javascript">alert("이메일을 확인하세요"); window.location="/";</script>');
            //res.send({errors:errors, number:3});
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
});

module.exports = router;