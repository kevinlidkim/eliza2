module.exports = function(app) {

  var users = require('./controllers/users');

  app.post('/eliza', users.submit_name);
  app.post('/eliza/DOCTOR', users.send_text);

  // app.post('/adduser', users.add_user);
  // app.post('/verify', users.verify);
  // app.post('/login', users.login);
  // app.post('/logout', users.logout);

  // app.post('/listconv', users.listconv);
  // app.post('/getconv', users.getconv);

  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });

};