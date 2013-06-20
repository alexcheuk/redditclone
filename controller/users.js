var model = require('../model');
var helper = require('./helper');

exports.create_user = function(req, res){

	model.users.get_users({
		email: [req.body.email]
	} , function(err, doc){
		if(doc.length>0 || !req.body.full_name || !req.body.email || !req.body.password){
			console.log("CREATING");
			res.send(helper.json_response(false));
			return;
		}else{
			model.users.create_user(req.body.full_name, req.body.email, req.body.password, function(doc){
				res.send(doc);
				return;
			});
		}
	});

	
}

exports.check_valid_email = function(req, res){
	if(!req.body.email){
		res.send(helper.json_response(false));
		return;
	}

	model.users.get_users({
		email: [req.body.email]
	} , function(err, doc){
		var response = helper.json_response((!err) ? true : false, {
			valid: (doc.length>0) ? false : true
		});
		res.send(response);
		return;
	});
}