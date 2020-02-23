const express = require('express');
const router = express.Router();

router.get('/',function(req,res,next){
    req.logout();
    res.send("");
})

module.exports=router;