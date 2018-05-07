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
        .catch(err1=>{res.json({status:false, message:'Update user error: '+err1, data:null})});
});

router.get('/getuserdetail/:userId', (req, res)=>{
    let userId = req.db.id(req.params.userId);
    let dbUsers = req.db.get('users'),
        dbUserDetail = req.db.get('userDetail');

    dbUsers.findOne({ _id: userId }, {
            username:1, firstname:1, lastname:1, email:1, level:1, status:1
        })
        .then(check1=>{
            if (check1===null) res.json({status:false, message:'Get user fail: Cannot find the account.', data:check1});
            else {
                dbUserDetail.findOne({ userId: userId })
                    .then(check2=>{
                        if (check2===null) res.json({status:false, message:'Get user detail fail: Cannot find the account.', data:check2});
                        else {
                            check2._id = undefined;
                            let result = {...check1, ...check2};
                            res.json({status:true, message:'Get user detail successfully!', data:result});
                        }
                    })
                    .catch(err2=>{res.json({status:false, message:'Get user detail error: '+err2, data:null})});
            }
        })
        .catch(err1=>{res.json({status:false, message:'Get user error: '+err1, data:null})});
});


module.exports = router;