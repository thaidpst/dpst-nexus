const express = require('express');
const router = express.Router();


router.get('/getusers/:start/:limit', (req, res)=>{
    let start = Number(req.params.start),
        limit = Number(req.params.limit);
    let dbUsers = req.db.get('users');

    dbUsers.find({}, {
            username:1, firstname:1, lastname:1, email:1, level:1, status:1,
            limit: limit
        })
        .then(check1=>{
            res.json({status:true, message:'Get users successfully!', data:check1})
        })
        .catch(err1=>{res.json({status:false, message:'Get users error: '+err1, data:null})})
});

router.post('/setaccountactive', (req, res)=>{
    let userId = req.db.id(req.body.input.userId);
    let dbUsers = req.db.get('users');

    dbUsers.findOne({ _id: userId })
        .then(check1=>{
            if (check1===null) res.json({status:false, message:'Set active fail: Cannot find the account.', data:0});
            else {
                check1.status = 'Active';
                dbUsers.update({ _id: userId }, check1, { multi: false })
                    .then(()=>{
                        res.json({ status:true, message:'The account is set active successfully.', data:1});
                    });
            }
        })
        .catch(err1=>{res.json({status:false, message:'Set active error: '+err1, data:null})});        
});

router.post('/deleteaccount', (req, res)=>{
    let userId = req.db.id(req.body.input.userId);
    let dbUsers = req.db.get('users');

    dbUsers.remove({ _id: userId }, { justOne: true })
        .then(status=>{
            res.json({status:true, message:'The account has been deleted successfully.', data:1});
        });      
});


module.exports = router;