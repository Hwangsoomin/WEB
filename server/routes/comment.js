/*var express = require('express');
var router = express.Router();
var Comment = require('../models/Comment');
var Board = require('../models/board');

router.post('/', checkPostId, function(req, res){
    var board = res.locals.board;

    req.body.author = req.user._id;
    req.body.board = board._id;

    Comment.create(req.body, function(err, comment){
        if(err){

        }
    })
})*/