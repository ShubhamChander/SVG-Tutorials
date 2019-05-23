const http = require('http') //HTTP
const fs = require('fs') //to read files
const url = require('url') //to understand url strings

const ROOT_DIR = 'html' //folder where all html files are


//Require certain MIME_TYPES
const MIME_TYPES = {
	
	'css':'text/css',
	'html':'text/html',
	'jpeg':'image/jpeg',
	'jpg':'image/jpeg',
	'js': 'application/javascript',
    'json': 'application/json',
    'png': 'image/png',
    'svg': 'image/svg+xml',
    'txt': 'text/plain'
	
}

function get_mime(fn){
	for (let extension in MIME_TYPES){
		if(fn.indexOf(extension, fn.length - extension.length) !== -1){
			return MIME_TYPES[extension]
		}
	}
	return MIME_TYPES['txt']
}


http.createServer(function (req,res){
	
	let urlObj = url.parse(req.url, true, false)
	console.log('\n==================')
	console.log("PATHNAME: " + urlObj.pathname)
	//ROOT_DIR is the directory html as stated above
	console.log("REQUEST: "+ ROOT_DIR + urlObj.pathname)
	console.log("METHOD: "+ req.method)
	
	let filePath = ROOT_DIR + urlObj.pathname
	if(urlObj.pathname == '/') filePath = ROOT_DIR + '/default.html'
	//console.log("The file Path name is ",+ filePath)
	
	fs.readFile(filePath,function(err,data){
		
		if(err){
			//report error on console
			console.log('ERROR: '+ JSON.stringify(err))
			//respond with 404
			res.writeHead(404)
			res.end(JSON.stringify(err))
			return			
		}
		res.writeHead(200, {'Content_Type': get_mime(filePath)})
		res.end(data)
		//console.log("the result is "+ JSON.parse(res))
	})
	
	
}).listen(3000)

console.log("Server is running at 3000")
console.log("Visit localhost:3000 for default page")
console.log("Visit localhost:3000/SVG_Drawing.html for shape page")
console.log("Visit localhost:3000/SVG_Texts.html for texts page")























	
