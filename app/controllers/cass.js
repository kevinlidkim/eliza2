var cassandra = require('cassandra-driver');

// var client = new cassandra.Client({contactPoint : ['127.0.0.1']});
// client.connect(function(err,result){
//     consolde.log('cassandra connected')
// });

var client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'hw4' });

exports.deposit = function(req, res) {

  var file = req.body.filename;
  var cont = req.body.contents;

  var query = 'INSERT INTO imgs (filename, contents) VALUES (?, ?)';

  client.execute(query, [file, cont], function(err, result) {
    if (err) {
      console.log(err);
      return res.status(404).json({
        status: "Couldn't deposit file"
      })
    } else {
      return res.status(200).json({
        status: 'Successfully deposited file'
      })
    }
  })
  
}

exports.retrieve = function(req, res) {

  var file = req.body.filename;

  var query = 'SELECT contents FROM imgs WHERE filename = ?';

  client.execute(query, [file], function(err, result) {
    if (err) {
      console.log(err);
      return res.status(404).json({
        status: "Couldn't retrieve file"
      })
    } else {
      var data = result.rows;
      return res.status(200).json({
        data: data
      })
    }
  })
}
