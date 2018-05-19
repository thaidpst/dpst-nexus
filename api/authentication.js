const express = require('express');
const router = express.Router();
let crypto = require('crypto');

// Use POST for security reason
router.post('/register', (req, res) => {
  let input = req.body.input;
  let dbUsers = req.db.get('users'),
    dbUserDetail = req.db.get('userDetail');

  if (input.password.length < 5)
    res.json({
      status: false,
      message: 'Register fail: Password is too short.',
      data: 0
    }); else {
    dbUsers.findOne({
      username: input.username
    })
      .then(check1 => {
        if (check1 === null) {

          dbUsers.findOne({
            email: input.email
          })
            .then(check2 => {
              if (check2 === null) {

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
                  .then(() => {
                    dbUsers.findOne({
                      username: input.username
                    }, {
                      _id: 1
                    })
                      .then(check4 => {

                        dbUserDetail.insert({
                          userId: check4._id,
                          profileUrl: 'assets/img/profile/base.jpg'
                        })
                          .then(() => {
                            res.json({
                              status: true,
                              message: 'Register successfully!',
                              data: 1
                            });
                          })
                          .catch(err5 => {
                            res.json({
                              status: false,
                              message: 'Register error: ' + err5,
                              data: null
                            });
                          });
                      })
                      .catch(err4 => {
                        res.json({
                          status: false,
                          message: 'Register error: ' + err4,
                          data: null
                        });
                      });
                  })
                  .catch(err3 => {
                    res.json({
                      status: false,
                      message: 'Register error: ' + err3,
                      data: null
                    });
                  });

              } else res.json({
                status: false,
                message: 'Register fail: Email is already in use.',
                data: -2
              });
            })
            .catch(err2 => {
              res.json({
                status: false,
                message: 'Register error: ' + err2,
                data: null
              });
            });

        } else res.json({
          status: false,
          message: 'Register fail: Username is already in use.',
          data: -1
        });
      })
      .catch(err1 => {
        res.json({
          status: false,
          message: 'Register error: ' + err1,
          data: null
        });
      });
  }
});

router.post('/login', (req, res) => {
  let username = req.body.username,
    password = req.body.password;
  let dbUsers = req.db.get('users');

  dbUsers.findOne({
    username: username
  })
    .then(userRecord => {
      if (!userRecord)
        throw Error('Incorrect username or password');

      let hash = crypto.pbkdf2Sync(password, userRecord.salt, 1000, 64, 'sha512').toString('hex');
      if (hash !== userRecord.password)
        throw Error('Incorrect username or password');

      res.json({
        status: true,
        message: 'login successful',
        data: {
          _id: userRecord._id,
          username: userRecord.username,
          level: userRecord.level,
          firstname: userRecord.firstname,
          lastname: userRecord.lastname,
          email: userRecord.email,
          status: userRecord.status
        }
      });
    })
    .catch(err => {
      res.json({
        status: false,
        message: 'login failed: ' + err.message,
        data: err.message
      });
    });
});

router.get('/authenticate', (req, res) => {
  if (req.cookies._id && req.cookies.username) {
    const userId = req.db.id(req.cookies._id),
      username = req.cookies.username,
      dbUsers = req.db.get('users');
    dbUsers.findOne({
      _id: userId,
      username: username
    }).then(userRecord => {
      if (userRecord) {
        res.json({
          status: true,
          message: 'authentication successful',
          data: {
            _id: userRecord._id,
            username: userRecord.username,
            status: userRecord.status,
            level: userRecord.level
          }
        });
      } else {
        logout(res, 'authentication failed: Mismatched username.');
      }
    }).catch(err => logout(res, 'authentication failed: ' + err));
  } else {
    res.json({
      status: true,
      message: 'not logged in',
      data: null
    });
  }
});

function logout(res, msg) {
  res.clearCookie('_id');
  res.clearCookie('username');
  res.json({
    status: false,
    message: msg
  });
}

module.exports = router;
