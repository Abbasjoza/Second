const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.json());

app.get('/api/courses', (req, res) => {
    fs.readFile('data.json','utf-8', function (err, data) {
       console.log(err);
        var json = JSON.parse(data)
        res.send(json);
    })

});
app.post('/api/courses', (req, res) => {
    const course = { id:Date.now(), cnic: req.body.cnic, cell: req.body.cell, name: req.body.name, address: req.body.address, area: req.body.area, cast: req.body.cast, remarks: req.body.remarks }
    fs.readFile('data.json', function (err, data) {
        var json = JSON.parse(data);
        json.unshift(course);
  	fs.writeFile('data.json', JSON.stringify(json), 'utf-8', function(err) {
		if (err) throw err
		console.log('Done!')
	})
    });
    res.send(course);
});

app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 5000
app.listen(port, () => { console.log(`I am on ${port} Port`) });