let express = require('express');
let app = express();
require('dotenv').config();
let bodyParser = require('body-parser');

//console.log('Hello World');

// app.get("/", (req, res) => {
//   res.send("Hello Express");
// });
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', function (req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.use('/public', express.static(__dirname + '/public'));

const absolutePath = __dirname + '/views/index.html';

app.get('/', (req, res) => {
  res.sendFile(absolutePath);
});

app.get('/json', (req, res) => {
  let message = 'Hello json';
  if (process.env.MESSAGE_STYLE === 'uppercase')
    message = message.toUpperCase();

  res.json({ message });
});

const timeMiddelware = (req, res, next) => {
  req.time = new Date().toString();
  next();
}

app.get('/now', timeMiddelware, (req, res) => {
  res.send({ time: req.time });
});

app.get('/:word/echo', (req, res) => {
  const word = req.params.word;
  res.json({ echo: word });
});

app.get('/name', (req, res) => {
  const first = req.query.first;
  const last = req.query.last;
  res.json({name: `${first} ${last}`});
});

app.post('/name',(req,res) => {
  const first = req.body.first;
  const last = req.body.last;
  res.json({name: `${first} ${last}`})
});
module.exports = app;