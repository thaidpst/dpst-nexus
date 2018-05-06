const express = require('express');
const router = express.Router();


router.get('/update/:userId', (req, res)=>{
    let userId = req.db.id(req.params.userId);
    let dbUsers = req.db.get('users');

    dbUsers.findOne({ _id: userId }, {
            username:1, firstname:1, lastname:1, email:1, level:1, status:1
        })
        .then(check1=>{
            if (check1===null) res.json({status:false, message:'Update user fail: Cannot find the account.', data:check1});
            else res.json({status:true, message:'Update user successfully!', data:check1});
        })
        .catch(err1=>{res.json({status:false, message:'Update user error: '+err1, data:null})})
});


module.exports = router;