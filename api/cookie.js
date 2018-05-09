const express = require('express');
const router = express.Router();


router.get('/setlogincookie/:username/:userId', (req, res) => {
  let username = req.params.username,
    userId = req.db.id(req.params.userId);
  res.cookie('username', username, {
    maxAge : 1000 * 60 * 60 * 24 * 7
  });
  res.cookie('_id', userId, {
    maxAge : 1000 * 60 * 60 * 24 * 7
  });
  res.send({
    status : true,
    message : 'Set user login cookie successfully!',
    data : 1
  });
});
router.get('/clearlogincookie', (req, res) => {
  res.clearCookie('_id');
  res.clearCookie('username');
  res.send({
    status : true,
    message : 'Clear user login cookie successfully!',
    data : 1
  });
});

module.exports = router;
