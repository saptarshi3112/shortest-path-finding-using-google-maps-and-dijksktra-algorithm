const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const map = require('./routes/api');

const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
app.use(bodyParser.json());

app.use('/map/', map);

const port = 5000;
app.listen(port, (err) => {
  if(err) { 
    throw err; 
  }
  else {
    console.log('server on port ' + port);
  }
});
