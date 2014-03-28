var
	request    = require('request')
	fs 		   = require('fs')
    colors     = require('colors')
	;


request.post('http://localhost/pdf_convert', { form: { id: '4' } },
    function (error, response, body) {
        console.log("Requesting pdf convert.".blue)
        if(error) console.log(('\t' + error).red)
        if (!error && response.statusCode == 200) {
        	body = JSON.parse(body)
            console.log("\tConvert pdf success.".green)
            if(body.success){
                console.log("\tDownloading pdf.".green)
            	request('http://localhost/pdf/4').pipe(fs.createWriteStream('./test/pdf.pdf'))
            }
        }
    }
);


request.post('http://localhost/word_convert', { form: { id: '4' } },
    function (error, response, body) {
        console.log("Requesting word convert.".blue)
    	if(error) console.log(('\t' + error).red)
        if (!error && response.statusCode == 200) {
    		body = JSON.parse(body)
            console.log("\tConvert word success.".green)
            if(body.success){
                console.log("\tDownloading word.".green)
            	request('http://localhost/word/4').pipe(fs.createWriteStream('./test/docx.docx'))
            }
        }
    }
);