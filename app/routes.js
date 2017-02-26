module.exports = function(app) {

  var users = require('./controllers/users');

  app.post('/eliza', users.submit_name);
  app.post('/eliza/DOCTOR', users.send_text);

  app.post('/adduser', users.add_user);
  app.post('/verify', users.verify);
  app.post('/login', users.login);
  app.get('/logout', users.logout);
  app.get('/status', users.auth);

  app.get('/listconv', users.list_conv);
  app.post('/getconv', users.get_conv);
  app.get('/get_current_conv', users.get_current_conv);

  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });

};