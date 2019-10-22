const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const http = require('http');
const https = require('https');

const map = require('./routes/api');

const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
app.use(bodyParser.json());

app.use('/map/', map);

const httpPort = 5000;
const httpsPort = 4000;

/*
app.listen(port, (err) => {
  if(err) {
    throw err;
  }
  else {
    console.log('server on port ' + port);
  }
});

*/

const options = {
	key: fs.readFileSync(__dirname+'/ssl/ryans-key.pem'),
	cert: fs.readFileSync(__dirname+'/ssl/ryans-cert.pem')
};


http.createServer(app)
	.listen(httpPort, (err) => {
		if (err) {
			throw err;
		} else {
			console.log('http server on port ' + httpPort);
		}
	});

https.createServer(options, app)
	.listen(httpsPort, (err) => {
		if (err) {
			throw err;
		} else {
			console.log('https server on port ' + httpsPort);
		}
	});

