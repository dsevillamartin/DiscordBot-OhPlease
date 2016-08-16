let express = require('express');
let exphbs  = require('express-handlebars');
let path    = require('path');

let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

let Log = require('./log');

Log.Socket(io);

let SocketReady = false;

io.on('connection', socket => {
  if (SocketReady) return false;
  Log.Logger.debug('Socket.IO Connected!');
  require('./Eris');
  SocketReady = true;
});

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || null);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('home', {
    logs: Log.Logger.logs
  });
});

process.on('exit', code => {
  if (code !== 200) {
    Log.Logger.info(code == 1 ? '=> Exited with an error' : '=> Exit');
    process.exit(200);
  }
});
process.on('SIGINIT', code => {
  if (code !== 200) {
    Log.Logger.info(code == 1 ? '=> Exited with an error' : '=> Exit');
    process.exit(200);
  }
});
process.on('SIGTERM', code => {
  if (code !== 200) {
    Log.Logger.info(code == 1 ? '=> Exited with an error' : '=> Exit');
    process.exit(200);
  }
});


server.listen(app.get('port'), app.get('ip'), () => {
  Log.Logger.info(`=> Listening on port ${app.get('ip') || 'localhost'}:${app.get('port')}`);
});
