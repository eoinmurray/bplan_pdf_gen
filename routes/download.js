var
	path 	= require('path'),
	fs 	= require('fs')
	;


var download = function(req, res, ext){
	var name = (ext === 'pdf') ? 'pdf' : 'word'

	var file = path.resolve(__dirname+ '/../tmp/' + name + '_' + req.params.id + '.' + ext);
	console.log("Downloading file:".green, file)
	res.download(file)

}


module.exports = download;