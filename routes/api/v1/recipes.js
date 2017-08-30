var express = require('express'),
    router  = express.Router(),
       User = require('../../../models/user.js'),
     Recipe = require('../../../models/recipe.js');

router.get('/', function(req,res){
  Recipe.find({'published':true}, function(err, query){
    res.json(query);
  });
});

router.get('/:q', function(req, res){
	Recipe.findById(req.params.q, function (err, found) {
		var images = found.images;
		var likes = found.likes.length;
    found.like_am = likes;
		/*if(likes > 1000000){
			like = likes / 1000000;
			like = like.toFixed(1);
			like = like+"M";
		}else if(likes > 1000){
			like = likes / 1000;
			like = like.toFixed(1);
			like = like+"K";
		}else{
			like = likes;
		}*/
		res.json(found);
	});
});
router.post('/:q', function(req, res){
	Recipe.findById(req.params.q, function (err, found) {
		var images = found.images;
		res.render('recipe', {
			qr1: found,
		title: found.name,
		imagesrc: images[0].src
		});
	});
});

	//connection.end();

router.get('/add', function(req, res){
	res.json({"knock knoch":"who's there?"});
});

function POST(req, x){
	return req.body.x;
}

router.post('/add', function(req, res){
	var title = req.body.title;
	var desc = req.body.desc;
	var image = req.body.image;
	var username = res.locals.user.username;

    // Validation
    req.checkBody('title', 'The title is required').notEmpty();
	req.checkBody('desc', "You'll need to write a description").notEmpty();
	req.checkBody('image', 'The image is not valid').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render('newRecipe',{
            errors:errors
        });
    } else {
		var ingredients = [];

		for(var a = 0; a<req.body.ingr_am; a++){
			ingredients.push({
				title : req.body.ingredient[a],
				amount : req.body.ingredient_amount[a],
				unit : req.body.ingredient_unit[a]
			});
		}
		var steps = [];

		for(var a = 0; a<req.body.step_am; a++){
			steps.push({
				 desc : req.body.step[a],
			 step_num : a
			});
		}

		console.log(ingredients);

		var newRecipe = new Recipe({
            name: title,
            creator_username: username,
            description: desc,
            published: true,
            ingredients : ingredients,
			steps: steps,
			images : [{ src : image}]
        });

		newRecipe.save(function(err, found){
			res.json({title:found.name, id:found._id});
		});
	}
});


module.exports = router;
