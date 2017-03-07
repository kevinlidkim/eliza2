var amqp = require('amqplib/callback_api');

var callback = function(bool, message) {
  if (bool) {
    return res.status(200).json({
      msg: message
    })
  }
}

exports.listen = function(req, res) {

  var already_returned = false;

  var args = req.body.keys;

  amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
      var ex = 'hw3';

      ch.assertExchange(ex, 'direct', {durable: false});

      ch.assertQueue('', {exclusive: true}, function(err, q) {
        console.log(' [*] Waiting for logs. To exit press CTRL+C');

        for (var i = 0; i < args.length; i++) {
          ch.bindQueue(q.queue, ex, args[i]);
          console.log('Binding keys ' + args[i]);
        }

        ch.consume(q.queue, function(msg) {
          console.log(" [x] Listening: Received %s: '%s'", msg.fields.routingKey, msg.content.toString());

          var message = msg.content.toString()
          callback(already_returned, message);
          already_returned = false;
        });
      });
    });
  });
}

exports.speak = function(req, res) {

  amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
      var ex = 'hw3';

      var key = req.body.key;
      var msg = req.body.msg;

      ch.assertExchange(ex, 'direct', {durable: false});
      ch.publish(ex, key, new Buffer(msg));
      console.log(" [x] Speak sent %s: '%s'", key, msg);

      return res.status(200).json({
        msg: msg,
        key: key
      })

    });

    setTimeout(function() { conn.close(); }, 500);
  });
}