const express = require('express');
const router = express.Router();
const Board = require('../models/board');

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
        if (req.user && req.user.email===post.auth)res.send(post);
        else if(req.user && req.user.email!==post.auth)res.send(post);
        else res.send(post);
    });
});

/*router.get('/write',function(req, res){
    if(req.user){
        res.render('board/board-write',{isLogin:"Logout"});
    }
    else{
        res.send('<script type="text/javascript">alert("로그인한 사용자만 작성할 수 있습니다."); window.location="/login"; </script>');
    }
});*/

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

module.exports = router;