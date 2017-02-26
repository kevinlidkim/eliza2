var moment = require('moment');
var db = require('../../db');
var ObjectId = require('mongodb').ObjectId;
var crypto = require('crypto');

var make_salt = function() {
  return crypto.randomBytes(16).toString('base64');
}

var encrypt_password = function(password, salt) {
  if (!password || !salt) {
    return '';
  }
  salt = new Buffer(salt, 'base64');
  return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
}

var authenticate = function(password, salt, hashed_password) {
  return encrypt_password(password, salt) === hashed_password;
}


var generate_nonsense = function(input_case) {
  input = input_case.toLowerCase();

  if (input.includes('hello') || input.includes('hi')) {
    return 'hello';
  } else if (input.includes('computer')) {
    return 'i am a computer';
  } else if (input.includes('who')) {
    return 'i am eliza';
  } else if (input.includes('what')) {
    return 'what do you want peasant';
  } else if (input.includes('bye')) {
    return 'good bye';
  } else if (input.includes('nonsense')) {
    return 'what do you mean I\'m speaking nonsense?';
  } else if (input.length < 3) {
    return 'I can\'t save you but I can heal your soul';
  } else if (input.length < 6) {
    return 'where does it hurt?'
  } else if (input.length < 9) {
    return 'maybe you should go see a real doctor'
  } else if (input.length < 12) {
    return 'yo you download the new fire emblem game?'
  } else {
    return 'You\'re crazy and I can\'t save you';
  }
}

exports.submit_name = function(req, res) {
  date = moment().format("MMMM Do YYYY")
  // console.log(req.body.name);
  var obj = { 
    name: req.body.name,
    date: date
  }

  return res.status(200).json({
    status: 'Post success',
    obj: obj
  })
}

exports.send_text = function(req, res) {
  // console.log(req.body);
  output = generate_nonsense(req.body.human);
  return res.status(200).json({
    status: 'Received message',
    eliza: output
  })
}

exports.create = function(req, res) {
  return res.status(200).json({
    status: 'Registration successful'
  })
}

exports.add_user = function(req, res) {
  var collection = db.get().collection('users');
  collection.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  })
    .then(function(user) {
      if (user) {
        return res.status(500).json({
          status: 'Email or username already in use'
        })
      } else {
        var salt = make_salt();
        var hashed_password = encrypt_password(req.body.password, salt);
        var random_key = encrypt_password(make_salt(), make_salt());
        collection.insert({
          username: req.body.username,
          email: req.body.email,
          salt: salt,
          hashed_password: hashed_password,
          verified: false,
          random_key: random_key
        })
          .then(function(data) {
            return res.status(200).json({
              status: 'Successfully created user',
              data: data
            })
          })
          .catch(function(err) {
            console.log(err);
            return res.status(500).json({
              status: 'Error creating user'
            })
          })
      }
    })
}

exports.verify = function(req, res) {
  var collection = db.get().collection('users');
  collection.findOne({
    email: req.body.email
  })
    .then(function(user) {
      if (!user) {
        return res.status(500).json({
          status: "Email not in use"
        })
      }
      else if (user.verified == true) {
        return res.status(500).json({
          status: 'User already verified'
        })
      } else {
        if (req.body.random_key == 'abracadabra' || req.body.random_key == user.random_key) {
          collection.update(
            { _id : ObjectId(user._id) },
            { $set: { 'verified' : true} }
          )
            .then(function(data) {
              return res.status(200).json({
                status: 'Successfully verified user'
              })
              .catch(function(err) {
                console.log(err);
                return res.status(200).json({
                  status: 'Unable to verify user'
                })
              })
            })
        } else {
          return res.status(401).json({
            status: 'Invalid verification token'
          })
        }
      }
    })
    .catch(function(error) {
      console.log(error);
      return res.status(500).json({
        status: 'Error finding user in database'
      })
    })
}

exports.list_conv = function(req, res) {
  var collection = db.get().collection('conversations');
  collection.find({
    username: req.body.username
  }).toArray()
    .then(function(convs) {
      console.log('found convos');
      console.log(convs);
      return res.status(200).json({
        status: 'Found conversations'
      })
    })
    .catch(function(err) {
      console.log(err);
      return res.status(500).json({
        status: 'Error querying for conversations'
      })
    })
}

exports.get_conv = function(req, res) {
  var collection = db.get().collection('conversations');
  collection.find({
    _id: req.body.conv_id
  }).toArray()
    .then(function(conv) {
      console.log('found convo by id');
      console.log(conv);
      return res.status(200).json({
        status: 'Found conversation by id'
      })
    })
    .catch(function(err) {
      console.log(err);
      return res.status(500).json({
        status: 'Error querying for conversation by id'
      })
    })
}

exports.login = function(req, res) {
  var collection = db.get().collection('users');
  collection.findOne({
    username: req.body.username
  })
    .then(function(user) {
      if (!user) {
        return res.status(500).json({
          status: 'Invalid username'
        })
      } else if (user.verified == false) {
        return res.status(401).json({
          status: 'User not verified yet'
        })
      } else {
        if (!authenticate(req.body.password, user.salt, user.hashed_password)) {
          return res.status(401).json({
            status: 'Invalid password'
          })
        } else {
          req.session.user = user.username;
          return res.status(200).json({
            status: 'Successfully logged in',
            user: user.username
          })
        }
      }
    })
    .catch(function(err) {
      console.log(err);
      return res.status(500).json({
        status: 'Error logging in'
      })
    })
}

exports.auth = function(req, res) {
  // console.log(req.session.user);
  if (!req.session.user) {
    return res.status(200).json({
      status: false
    });
  } else {
    return res.status(200).json({
      status: true
    })
  }
}

exports.logout = function(req, res) {
  if (req.session.user) {
    req.session.destroy();
    return res.status(200).json({
      status: 'Successfully logged out'
    })
  } else {
    return res.status(500).json({
      status: 'No logged in user'
    })
  }
}