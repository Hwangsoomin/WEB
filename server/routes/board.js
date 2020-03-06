const express = require('express');
const router = express.Router();
const Board = require('../models/board');
const mongoose = require('mongoose');

router.get('/', function (req, res) {
    console.log('드러왔니?');
    Board.find({})
        .sort("-date")
        .exec(function (err, lists) {
            if (err) { console.log(err); }
            res.send(lists);
        });
});

router.get('/view/:id', function (req, res) {//params query
    console.log('view 들어옴');
    Board.findOne({ _id: req.params.id }, function (err, post) {
        if (err) console.log(err);
        res.send(post);
    });
});

router.post('/write', function (req, res) {
    Board.find({ title: req.body.title })
        .exec()
        .then(post => {
            if (post.length >= 5) {
                res.send('<script type="text/javascript">alert("도배 방지를 위해 같은 제목의 글을 5개 이상 게시할 수 없습니다."); window.location="/board/write"; </script>');
            }
            else {
                const post = new Board({
                    category: req.body.category,
                    auth: req.user.email,
                    date: new Date(),
                    title: req.body.title,
                    content: req.body.content
                });
                post
                    .save()
                    .then(result => {
                        console.log(result);
                        res.send('<script type="text/javascript">alert("게시글이 업로드되었습니다"); window.location="/board"; </script>');
                    })
                    .catch(err => {
                        console.log(err);
                        res.send('<script type="text/javascript">alert("작성이 실패하였습니다."); window.location="/board/write"; </script>');
                    });
            }
        });
});

router.put('/edit/:id', function(req, res){
    console.log(req.body);
    console.log("id는" + req.params.id);
    console.log('edit 성공쓰???');
    console.log(req.body.title);
    console.log(req.body.content);
    Board.findOneAndUpdate({_id : req.params.id},
        {$set:{title:req.body.title, date:new Date(), content:req.body.content}}, function(err, post){
            if(err) console.log(err);
            res.send('게시글이 수정되었습니다!');
        })
});

router.delete('/delete/:id', function(req, res){
    Board.deleteOne({_id: req.params.id}, function(err, obj){
        if(err)throw err;
        res.send('해당 게시글이 삭제되었습니다.');
    })
})
module.exports = router;