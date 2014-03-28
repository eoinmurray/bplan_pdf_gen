var
	_ = require('underscore')
	;

var sanitize = function(str){

	// _.each(str, function(val, key){
	// 	// console.log(val.value)

	// 	val.value = (val.value).replace(new RegExp('(\n){2,}', 'gim') , '\n');
	// })

	return str;
}

module.exports = sanitize;