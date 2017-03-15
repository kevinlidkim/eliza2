module.exports = function(app) {

  var users = require('./controllers/users');
  var rabbit = require('./controllers/rabbit');
  var cass = require('./controllers/cass');

  app.post('/eliza', users.submit_name);
  app.post('/eliza/DOCTOR', users.send_text);
  app.post('/DOCTOR', users.send_text);

  app.post('/adduser', users.add_user);
  // app.post('/listall', users.list_all);
  // app.post('/getall', users.get_all);

  app.post('/addusercaptcha', users.add_user_captcha);
  app.post('/verify', users.verify);
  app.post('/login', users.login);
  app.get('/logout', users.logout);
  app.post('/logout', users.logout);
  app.get('/status', users.auth);

  app.post('/listconv', users.list_conv);
  app.post('/getconv', users.get_conv);
  app.get('/get_current_conv', users.get_current_conv);

  app.post('/listen', rabbit.listen);
  app.post('/speak', rabbit.speak);

  app.post('/deposit', cass.deposit);
  app.post('/retrieve', cass.retrieve);

  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });

};