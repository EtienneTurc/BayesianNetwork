const express = require('express')
const app = express()
const path = require('path');


app.use(express.static('public'));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/slider', function (req, res) {
	res.sendFile(path.join(__dirname, 'index_slider.html'))
})

app.listen(8080, function () {
	console.log('Example app listening on port 8080!')
})
