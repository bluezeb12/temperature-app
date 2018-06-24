const express = require('express');
const io = require('socket.io')();
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();
const port = process.env.PORT || 5000;
const ioPort = 8000;

let data = [];

io.on('connection', (client) => {
	client.on('subscribeToTimer', (interval) => {
		console.log('client is subscribing to timer with interval', interval);
		setInterval(() => {
			client.emit('timer', new Date());
		}, interval);
	});
});

io.listen(ioPort);
console.log('listening on port', ioPort);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/', (req, res) => {
	res.send({ express: 'Hello From Express' });
});

app.post('/api/temp', (req, res) =>{
	var temp = {};
	var temperatureC = req.body.temperature;
	var tempF = temperatureC * 9 / 5 + 32;
	temp.time = moment().format('MMMM Do YYYY, h:mm:ss a');
	temp.temperature = tempF;
	temp.humidity = req.body.humidity
	temp.index = data.length;
	//console.log(temp);
	data.push(temp);
	//console.log(data);
	res.status(200).send();
	io.emit('newData', temp);
})

app.listen(port, () => console.log(`Listening on port ${port}`));