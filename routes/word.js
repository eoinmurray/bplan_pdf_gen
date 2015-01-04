var
	_ 				= require('underscore'),
	template 		= require('./template'),
	sanitize 	    = require('./sanitize'),
  	markdownword 	= require("markdown-word"),
	path 			= require('path')
	fs 				= require('fs')
	;

var jsonToMarkdown = function(json, cb){
	console.log("\tTemplating")
	cb(template({model : json}))
}

var word = function(req, res, firebase){
	console.log("Word Convert request:".blue, req.body.id)
	firebase.child(req.body.id).on('value', function(snapshot){
		console.log("\tFetched from Firebase.")

		var val = sanitize(snapshot.val())
		console.log("\tSanitized")
		jsonToMarkdown(val, function(md){
			console.log('\tRecieved markdown convert')
			if(!md) res.send({success : false, error : 'Invalid characters.'})
			console.log("\tConverted to markdown")

			var file = path.resolve(__dirname+ '/../tmp/word_' + req.body.id + '.docx');
			console.log("\tConverting to Pdf".blue)

			markdownword.documentFromMarkdown(md, file, function(err, file) {
    			console.log("\tCreated: ".green, file)
  				return res.send({success : true})
  			});

		})
	})
}


module.exports = word;