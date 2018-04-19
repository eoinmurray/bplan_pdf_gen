var
	markdownpdf = require("markdown-pdf"),
	template 	= require('./template'),
	sanitize 	= require('./sanitize'),
	path 		= require('path')
	;

var jsonToMarkdown = function(json, cb){
	cb(template({model : json}))
}

var pdf = function(req, res, firebase){
	console.log("PDF Convert request:".blue, req.body.id)
	firebase.database().ref(req.body.id).on('value', function(snapshot){
		console.log("\tFetched from Firebase.")

		var val = sanitize(snapshot.val())

		jsonToMarkdown(val, function(md){
			if(!md) res.send({success : false, error : 'Invalid characters.'})
			console.log("\tConverted to markdown")

			var file = path.resolve('/tmp/pdf_' + req.body.id + '.pdf');
			console.log("\tConverting to Pdf".blue)

			console.log("\t" + file)

			markdownpdf({
			    cssPath : __dirname + '/pdf.css',
			    paperFormat : "A4",
			    paperBorder : "2in",
			})
			.from.string(md).to(file, function () {
  				console.log("\tCreated: ".green, file)
  				res.send({success : true})
			})
		})
	})
}


module.exports = pdf;
