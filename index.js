var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var secret = require('../secret.json');

mongoose.connect(secret.mongo);
var db = mongoose.connection;

var routes = require('./routes/index');
var apiv1 = require('./routes/api/v1');
var apiv1r = require('./routes/api/v1/recipes.js');
var apiv1u = require('./routes/api/v1/users.js');

// Init App
var app = express();

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://datastream.eu.auth0.com/.well-known/jwks.json"
    }),
    audience: 'https://api.dexterchef.com',
    issuer: "https://datastream.eu.auth0.com/",
    algorithms: ['RS256']
});

app.use(jwtCheck);


app.use(function(err, req, res, next){
	if(err.name === 'UnauthorizedError') {
		console.log(req.user);
		res.status(401).json({message:'Missing or invalid token'});
	}
})

app.use('/', routes);
app.use('/api/v1/', apiv1);
app.use('/api/v1/recipe', apiv1r);
app.use('/api/v1/user', apiv1u);

// Set Port
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});
