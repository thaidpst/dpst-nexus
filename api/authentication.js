const express = require('express');
const router = express.Router();
let crypto = require('crypto');


router.post('/register', (req, res)=>{
    let input = req.body.input;
    let dbUsers = req.db.get('users');

    if (input.password.length<5) res.json({status:false, message:'Register fail: Password is too short.', data:0});
    else {
        dbUsers.findOne({ username: input.username })
            .then(check1=>{
                if (check1===null) {

                    dbUsers.findOne({ email: input.email })
                        .then(check2=>{
                            if (check2===null) {

                                let salt = crypto.randomBytes(16).toString('hex'),
                                    hash = crypto.pbkdf2Sync(
                                        input.password, salt,
                                        1000, 64, 'sha512'
                                    ).toString('hex');

                                dbUsers.insert({
                                    username: input.username,
                                    password: hash,
                                    salt: salt,
                                    level: 1,
                                    firstname: input.firstname,
                                    lastname: input.lastname,
                                    email: input.email,
                                    status: 'Pending'
                                })
                                .then(check3=>{res.json({status:true, message:'Register successfully!', data:1})})
                                .catch(err3=>{res.json({status:false, message:'Register error: '+err3, data:null})})

                            } else res.json({status:false, message:'Register fail: Email is already in use.', data:-2});
                        })
                        .catch(err2=>{res.json({status:false, message:'Register error: '+err2, data:null})});

                } else res.json({status:false, message:'Register fail: Username is already in use.', data:-1});
            })
            .catch(err1=>{res.json({status:false, message:'Register error: '+err1, data:null})});
    }
});
router.get('/login/:username/:password', (req, res)=>{
    let username = req.params.username,
        password = req.params.password;
    let dbUsers = req.db.get('users');

    dbUsers.findOne({ username: username })
        .then(check1=>{
            if (check1===null) res.json({status:false, message:'Login fail: Wrong username or password.', data:0});
            else {
                let hash = crypto.pbkdf2Sync(password, check1.salt, 1000, 64, 'sha512').toString('hex');
                if (hash===check1.password) {
                    res.json({
                        status: true, 
                        message: 'Login successfully!', 
                        data: {
                            _id: check1._id,
                            username: check1.username,
                            level: check1.level,
                            firstname: check1.firstname,
                            lastname: check1.lastname,
                            email: check1.email,
                            status: check1.status
                        }
                    });
                } else res.json({status:false, message:'Login fail: Wrong username or password.', data:0});             
            }
        })
        .catch(err1=>{res.json({status:false, message:'Login Error: '+err1, data:null})})
});


module.exports = router;