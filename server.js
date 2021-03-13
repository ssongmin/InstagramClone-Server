const express = require('express');
const morgan = require('morgan');
var cors = require('cors');
const bodyParser = require('body-parser');

const http = require('http');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: true, // server의 url이 아닌, 요청하는 client의 url
    credentials: true
}));

// app.get('/', function(req, res)  {
//     res.send('teststest');
//     return;
// });

app.use(require('./postRouter'));


http.createServer(app).listen(3000);