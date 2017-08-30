var express = require('express'),
    router  = express.Router(),
       User = require('../../../models/user.js'),
     Recipe = require('../../../models/recipe.js'),
   services = require('../../../v1services.json');

router.get('/', function(req, res){
	res.json(services);
});


module.exports = router;
