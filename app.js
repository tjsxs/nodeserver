const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');


const routes = require('./routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('tiny'));
app.use(cors());


app.use('/', express.static(__dirname + '/public'));
app.use('/', express.static(__dirname + '/public/js'));
app.use('/', express.static(__dirname + '/public/css'));


// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// });
app.use('/', routes);


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});