var cassandra = require('cassandra-driver');
var client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'hw4' });

var multer = require('multer');
var upload = multer().single('contents');

var fs = require('fs');

exports.deposit = function(req, res) {

  upload(req, res, function(err) {
    if (err) {
      console.log(err);
      return res.status(404).json({
        status: 'Failed to upload file'
      })
    } else {
      var file = req.body.filename;
      var cont = req.file.buffer;

      console.log('DEPOSITING FILE ' + file);
      console.log('================');
      console.log('');
      console.log(req.file);
      console.log('');

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
  })
  
}

exports.retrieve = function(req, res) {

  var file = req.query.filename;

  var query = 'SELECT contents FROM imgs WHERE filename = ?';

  client.execute(query, [file], function(err, result) {
    if (err) {
      console.log(err);
      return res.status(404).json({
        status: "Couldn't retrieve file"
      })
    } else {
      var data = result.rows[0].contents;

      var mimetype;
      if (file.includes('.png')) {
        res.set('Content-Type', 'image/png');
        res.header('Content-Type', 'image/png');
        mimetype = 'image/png';
      } else if (file.includes('.jpg')) {
        res.set('Content-Type', 'image/jpg');
        res.header('Content-Type', 'image/jpg');
        mimetype = 'image/jpg';
      }

      console.log('RETRIEVING FILE ' + file);
      console.log('================');
      console.log('');
      console.log(data);
      console.log('');

      res.writeHead(200, {
        'Content-Type': mimetype,
        'Content-disposition': 'attachment;filename=' + file,
        'Content-Length': data.length
      });
      res.end(new Buffer(data, 'binary'));
    }
  })
}
