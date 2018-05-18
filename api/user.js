const express = require('express');
const router = express.Router();


router.get('/update/:userId', (req, res) => {
  let userId = req.db.id(req.params.userId);
  let dbUsers = req.db.get('users');

  dbUsers.findOne({ _id: userId }, {
    username: 1, firstname: 1, lastname: 1, email: 1, level: 1, status: 1
  })
    .then(check1 => {
      if (check1 === null) res.json({ status: false, message: 'Update user fail: Cannot find the account.', data: check1 });
      else res.json({ status: true, message: 'Update user successfully!', data: check1 });
    })
    .catch(err1 => { res.json({ status: false, message: 'Update user error: ' + err1, data: null }); });
});

router.get('/getuserdetail/:userId', (req, res) => {
  let userId = req.db.id(req.params.userId);
  let dbUsers = req.db.get('users'),
    dbUserDetail = req.db.get('userDetail');

  let userInfo;
  dbUsers.findOne({ _id: userId }, {
    username: 1, firstname: 1, lastname: 1, email: 1, level: 1, status: 1
  })
    .then(_userInfo => {
      if (!_userInfo)
        throw Error('Cannot find user info.');
      userInfo = _userInfo;
      return dbUserDetail.findOne({ userId: userId });
    })
    .then(userDetails => {
      if (!userDetails)
        throw Error('Cannot find user details.');
      userDetails._id = undefined;
      let result = { ...userInfo, ...userDetails };
      res.json({ status: true, message: 'Get user details successful!', data: result });
    })
    .catch(err => { res.json({ status: false, message: 'Get user details failed: ' + err.message }); });
});

router.post('/updateuserdetail', (req, res) => {
  let userId = req.db.id(req.body.input.userId),
    updatedUserDetail = req.body.input.updatedUserDetail;
  let dbUserDetail = req.db.get('userDetail');

  dbUserDetail.findOne({ userId: userId })
    .then(userDetails => {
      if (!userDetails)
        throw Error('Cannot find user account.');
      let result = { ...userDetails, ...updatedUserDetail };
      return dbUserDetail.update({ _id: req.db.id(userDetails._id) }, result, { multi: false });
    })
    .then(() => {
      res.json({ status: true, message: 'The user detail has been updated successfully.', data: 1 });
    })
    .catch(err => { res.json({ status: false, message: 'Update user details failed: ' + err.message }); });
});


module.exports = router;
