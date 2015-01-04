var
	request    = require('request')
	fs 		   = require('fs')
    colors     = require('colors')
	;

var markdownpdf = require("markdown-pdf")

// var md = "foo===\n* bar\n* baz\n\nLorem ipsum dolor sit"
//   , outputPath = __dirname + "/doc.pdf"

// markdownpdf({
//     cssPath : __dirname + '/pdf.css',
//     paperFormat : "A4",
//     paperBorder : "2in",
// }).from.string(md).to(outputPath, function () {
//     console.log("Created", outputPath)
// })



request.post('http://localhost:8000/pdf_convert', { form: { id: '4' } },
    function (error, response, body) {
        console.log("Requesting pdf convert.".blue)
        if(error) console.log(('\t' + error).red)
        if (!error && response.statusCode == 200) {
        	body = JSON.parse(body)
            console.log("\tConvert pdf success.".green)
            if(body.success){
                console.log("\tDownloading pdf.".green)
            	request('http://localhost:8000/pdf/4').pipe(fs.createWriteStream('./test/pdf.pdf'))
            }
        }
        else{console.log(error, response.statusCode)}
    }
);


// request.post('http://localhost:8000/word_convert', { form: { id: '4' } },
//     function (error, response, body) {
//         console.log("Requesting word convert.".blue)
//     	if(error) console.log(('\t' + error).red)
//         if (!error && response.statusCode == 200) {
//     		body = JSON.parse(body)
//             console.log("\tConvert word success.".green)
//             if(body.success){
//                 console.log("\tDownloading word.".green)
//             	request('http://localhost:8000/word/4').pipe(fs.createWriteStream('./test/docx.docx'))
//             }
//         }
//     }
// );