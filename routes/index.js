var express = require('express'),
    router  = express.Router(),
    version = require('../package.json').version
/*var path = require('path');
var formidable = require('formidable');
var fs = require('fs');*/

router.get('/', function(req, res){
	res.json({"name":"dexterchef-backend","version":version,"api":[{"version":"v1","path":"/api/v1/"}]});
	});

/*router.post('/upload', function(req, res){

  var form = new formidable.IncomingForm();

  form.multiples = true;

  form.uploadDir = 'public/images/recipes';

  form.on('file', function(field, file) {
	var ext = file.name.substr(file.name.lastIndexOf('.')+1);
	var exti = ext.toUpperCase();
	if(exti == "PNG" || exti == "JPG" || exti == "JPEG" || exti == "BMP" || exti=="GIF" || exti=="TIFF"){
		var fn = file.path.substr(file.path.lastIndexOf('\\')+1) + "." + ext;
		fs.rename(file.path, path.join(form.uploadDir, fn));
		console.log(file.name);
		console.log(file.path);
		console.log(fn);
		res.send(fn);
	} else {
		res.send("Error: ."+ext+" is not allowed...");
	}
  });

  // log any errors that occur
  form.on('error', function(err) {
	  if(err) throw err;
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end("");
  });

  // parse the incoming request containing the form data
  form.parse(req);

});*/

module.exports = router;
