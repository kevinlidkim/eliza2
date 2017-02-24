var moment = require('moment');
var db = require('../../db');
var ObjectId = require('mongodb').ObjectId;

generate_nonsense = function(input_case) {
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

  // make sure no one else has the same username or email
  // use passportjs

  var collection = db.get().collection('users');
  collection.insert({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    verified: false
  })
    .then(function(data) {
      return res.status(200).json({
        status: 'Successfully created user'
      })
    })
    .catch(function(err) {
      console.log(err);
      return res.status(500).json({
        status: 'Error creating user'
      })
    })
}

exports.verify = function(req, res) {

  // need to check key somewhere

  var collection = db.get().collection('users');
  collection.find({
    email: req.body.email
  }).toArray()
    .then(function(users) {
      console.log('found user');
      var user = users[0];

      // check key here before verifying

      collection.update(
        { _id : ObjectId(user._id) },
        { $set: { 'verified': true } }
      )
        .then(function(data) {
          console.log(data);
          return res.status(200).json({
            status: 'Successfully verified user'
          })
        })
        .catch(function(err) {
          console.log(err);
          return res.status(500).json({
            status: 'Error verifying user'
          })
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
  var collection = db.get().collection(conversations);
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

// exports.add_user = function(req, res) {

//   console.log(req.body);
//   console.log('creating entity');

//   var collection = db.get().collection('users');
//   collection.insert({
//     username: req.body.username,
//     password: req.body.password,
//     verified: false
//   })
//     .then(function(data) {
//       console.log(data);
//       console.log('finding user');
//       collection.find({
//         username: req.body.username
//       }).toArray()
//         .then(function(data2) {
//           console.log(data2);
//         })
//     })
// }