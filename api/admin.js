const express = require('express');
const router = express.Router();


router.get('/getusers/:start/:limit/:sort/:search', (req, res) => {
  let start = Number(req.params.start),
    limit = Number(req.params.limit),
    sort = req.params.sort,
    search = req.params.search;
  let dbUsers = req.db.get('users');

  let sortObj = {};
  if (sort == 'Firstname increasing') sortObj = { firstname: 1 };
  else if (sort == 'Firstname decreasing') sortObj = { firstname: -1 };
  else if (sort == 'Level increasing') sortObj = { level: 1 };
  else if (sort == 'Level decreasing') sortObj = { level: -1 };
  else if (sort == 'Status increasing') sortObj = { status: 1 };
  else if (sort == 'Status decreasing') sortObj = { status: -1 };
  else if (sort == 'Register date increasing') sortObj = { _id: 1 };
  else if (sort == 'Register date decreasing') sortObj = { _id: -1 };

  let query = {};
  if (search == 'EmptyNone') query = {};
  else {
    query = {
      $or: [
        { username: { $regex: search, $options: 'i' } },
        { firstname: { $regex: search, $options: 'i' } },
        { lastname: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    };
  }

  dbUsers.find(query, {
    username: 1, firstname: 1, lastname: 1, email: 1, level: 1, status: 1,
    limit: limit, skip: start, sort: sortObj
  })
    .then(check1 => {
      dbUsers.count()
        .then(totalUsers => {
          res.json({
            status: true,
            message: 'Get users successfully!',
            data: check1,
            totalUsers: totalUsers
          });
        })
        .catch(err2 => { res.json({ status: false, message: 'Get users error: ' + err2, data: null }); });
    })
    .catch(err1 => { res.json({ status: false, message: 'Get users error: ' + err1, data: null }); });
});

router.post('/setaccountstatus', (req, res) => {
  let userId = req.db.id(req.body.input.userId),
    status = req.body.input.status;
  let dbUsers = req.db.get('users');

  dbUsers.findOne({ _id: userId })
    .then(check1 => {
      if (check1 === null) res.json({ status: false, message: 'Set account status fail: Cannot find the account.', data: 0 });
      else {
        check1.status = status;
        dbUsers.update({ _id: userId }, check1, { multi: false })
          .then(() => {
            res.json({ status: true, message: 'The account status set successfully.', data: 1 });
          });
      }
    })
    .catch(err1 => { res.json({ status: false, message: 'Set account status error: ' + err1, data: null }); });
});

router.post('/deleteaccount', (req, res) => {
  let userId = req.db.id(req.body.input.userId);
  let dbUsers = req.db.get('users'),
    dbUserDetail = req.db.get('userDetail');

  dbUsers.remove({ _id: userId }, { justOne: true })
    .then(() => {
      dbUserDetail.remove({ userId: userId }, { justOne: true })
        .then(() => {
          res.json({ status: true, message: 'The account has been deleted successfully.', data: 1 });
        });
    });
});

router.post('/updateuserprivilage', (req, res) => {
  let userId = req.db.id(req.body.input.userId),
    updatedUserinfo = req.body.input.updatedUserinfo;
  let dbUserUsers = req.db.get('users');

  dbUserUsers.findOne({ _id: userId })
    .then(check1 => {
      if (check1 === null) res.json({ status: false, message: 'Update user info fail: Cannot find the account.', data: 0 });
      else {
        let result = { ...check1, ...updatedUserinfo };
        dbUserUsers.update({ _id: userId }, result, { multi: false })
          .then(() => { res.json({ status: true, message: 'The user info has been updated successfully.', data: 1 }); });
      }
    })
    .catch(err1 => { res.json({ status: false, message: 'Update user info error: ' + err1, data: null }); });
});


module.exports = router;