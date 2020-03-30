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

router.post('/', function (req, res, next) {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                res.send('이미 존재하는 이메일입니다.');
            }
            else {
                var mailOpt = {
                    from: 'maum9709@gmail.com',
                    to: req.body.email,
                    subject: '인증번호입니다.',
                    html: key_for_verify
                };
                smtpTransport.sendMail(mailOpt, function (err, res) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('email has been sent');
                    }
                    smtpTransport.close();
                });
                res.send('이메일을 확인하세요.');
            }
        });
});

router.post('/verify',function(req, res, next){
    console.log(key_for_verify);
    console.log(req.body);
    if(key_for_verify === req.body.key) res.send('인증되었습니다.');
    else res.send('인증번호를 다시 확인하세요.');
  })
module.exports = router;