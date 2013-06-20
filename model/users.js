var db = require('./db');

exports.create_user = function(fullName, email, password, callback){
	db.open(function(err, mongoClient) {
		var collection = db.collection("users");

		collection.save({full_name: fullName, email: email, password:password}, function(err, doc) {
			db.close();	
			callback(doc);
	    });
	});
}

exports.get_users = function(objFilter, callback){
	db.open(function(err, mongoClient) {
		var collection = db.collection("users");

		objFilter = (objFilter || {});

		var query = {};

		if(objFilter.email && objFilter.email.length>0){
			query.email = { $in: objFilter.email }
		}

		if(objFilter.first_name && objFilter.first_name.length>0){
			query.first_name = { $in: objFilter.first_name }
		}

		if(objFilter.last_name && objFilter.last_name.length>0){
			query.last_name = { $in: objFilter.last_name }
		}

		collection.find(query).toArray(function(err, doc) {
			db.close();
			
			console.log(doc);
			callback(err,doc);
	    });
	});
}