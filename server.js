var express = require('express');
var partials = require('express-partials');
var app = express();
var port = process.env.PORT || 4000;
var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(partials());
app.use(express.static(__dirname + '/public'));

// Root page
app.get('/', 
function(req, res) {
  res.render('index');
});
app.get('/stream', 
function(req, res) {
  var link = req.query.link;
  var key = req.query.key;
  var cmd = "bash stream.sh " + key + " " + link +" 2>&1  | tee log.txt ";
  console.log(cmd);
  console.log("Đã Live Tắt trinh duyệt đi !! chờ tầm 3,4 p tự Live");
  exec(cmd, puts);
});
app.get('/streamoff',
function(req, res) {
  var cmd = "pkill ffmpeg";
  exec(cmd, puts);
});
app.get('/host', 
function(req, res) {
  exec("bash stream.sh 468 https://www.youtube.com/watch?v=mn1nWOOMH9E", puts);
});
app.get('/view', 
function(req, res) {
  res.render('view');
});

app.listen(port);
console.log('Server is listening on ' + port);
