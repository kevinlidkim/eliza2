var db = require('./db');
var crypto = require('crypto');

var collection = db.get().collection('users');
var ObjectId = require('mongodb').ObjectId;

var LocalStrategy = require('passport-local').Strategy;

var makeSalt = function() {
  return crypto.randomBytes(16).toString('base64');
}

var encryptPassword = function(password, salt) {
  if (!password || !salt) {
    return '';
  }
  salt = new Buffer(salt, 'base64');
  return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
}

var authenticate = function(password, salt, hashedPassword) {
  return encryptPassword(password, salt) === hashedPassword;
}

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    return done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    collection.findOne({
      _id: ObjectId(id)
    })
      .then(function(user) {
        if (!user) {
          console.log('Logged in user not in database');
          return done(null, false);
        }
        return done(null, user);
      })
      .catch(function(err) {
        return done(err, false);
      })
  });

  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, username, password, done) {
    collection.findOne({
      username: username
    })
      .then(function(user) {
        if (!user) {
          return done(null, false, { message: 'Unknown user' });
        } else if (!authenticate(password, user.salt, user.hashedPassword)) {
          return done(null, false, { message: 'Invalid password'});
        } else {
          return done(null, user);
        }
      })
      .catch(function(err) {
        return done(err);
      });
  }));

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, username, password, done) {
    collection.findOne({
      $or: [ { username: username }, { email: req.body.email } ]
    })
      .then(function(user) {
        if (user) {
          return done(null, false, { message: 'Username or Email already in use' });
        } else {
          var salt = makeSalt();
          var hashedPassword = encryptPassword(req.body.password, salt);
          collection.insert({
            username: req.body.username,
            hashedPassword: hashedPassword,
            salt: salt,
            email: req.body.email,
            verified: false
          })
            .then(function(new_user) {
              return done(null, new_user);
            })
            .catch(function(err) {
              return done(err);
            });
        }})
  }))

};
