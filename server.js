const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    cors = require('cors'),
    bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//register the routes
require('./routes/user-routes')(app);
require('./routes/media-routes')(app);

app.listen(port);

console.log('Armondo RESTful API server started on: ' + port);