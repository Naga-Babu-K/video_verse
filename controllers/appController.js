const db = require('../config/db');

exports.renderIndex = async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  res.render('index', {
    user: req.session.user,
  });
};
