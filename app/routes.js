module.exports = function(app, passport) {

  var users = require('./controllers/users');

  app.post('/eliza', users.submit_name);
  app.post('/eliza/DOCTOR', users.send_text);

  // app.post('/adduser', passport.authenticate('local-signup', {
  //   failureRedirect: '/signup',
  //   failureFlash: true
  // }), users.create);

  app.post('/adduser', users.add_user);
  app.post('/verify', users.verify);
  // app.post('/login', users.login);
  // app.post('/logout', users.logout);

  // app.post('/listconv', users.list_conv);
  // app.post('/getconv', users.get_conv);

  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });

};