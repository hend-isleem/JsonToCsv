const express = require('express');
var bodyParser = require('body-parser');
const fs = require('fs');
path = require('path');
const app = express();
const port = 3000;

app.use(express.static('./client'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.post('/',  (req, res) => {
	
	var obj = JSON.parse(req.body.text);
	// var keys = Object.keys(obj);
	// keys.pop();
	var str = req.body.text.replace(/\n|\r/g, "").replace(/\s/g, '');
	var text = str.substring(1, str.length-1);
	// console.log(text.split('['))

	console.log( typeof(req.body.text),"hhahaha", hend(obj));

	fs.writeFile('result.csv', hend(obj), err => {
	  if (err) {
	    console.log('there was an err')
		return;
	  } 
	  res.download('result.csv', (err)=>{

		console.log(err);
	
	});
	})
	// res.send(hend(obj));
	
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// console.log("haha");
// var out = document.getElementById('haha').value = "haha";

var hend = function(obj) {
	var final = "";
	var keys = Object.keys(obj);
	keys.pop();
	var result = '';
	for (let i = 0; i < keys.length; i++) {
		result += keys[i];
		if (i < keys.length - 1) {
			result += ',';
		}
	} 
	final += result + '\n';
	var oneObjData = '';
	function innerHend(obj) {
		for (let i = 0; i < keys.length; i++) {
			if (obj[keys[i]]) { //there is sub obj
				oneObjData += obj[keys[i]];
			}
			if (i < keys.length - 1) {
				oneObjData += ',';
			}
		}
		oneObjData += '\n';
		if (obj.children && obj.children.length !== 0) {
			for (var i = 0; i < obj.children.length; i++) {
				innerHend(obj.children[i]);
			}
		} else {
			return;
		}
	}
	innerHend(obj)
	final += oneObjData;
	return final;
}
