const express = require('express')
const app = express()

const path = require('path');
const fs = require('fs')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('public'));

app.get('/', function (req, res) {
	let data = (new Date()).toString() + "\n"
	fs.appendFile("trafic.txt", data, function (err, buf) {
		if (err) {
			console.log(err);
			res.send(err)
		}
	});
	res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/feedback', function (req, res) {
	let text_to_store = (new Date()).toString() + ": " + req.body.feedback + "\n"
	fs.appendFile('feedback.txt', text_to_store, function (err) {
		if (err) {
			res.send(err)
		};
	});
	res.sendStatus(200)
})

app.listen(8080, function () {
	console.log('Example app listening on port 8080!')
})
