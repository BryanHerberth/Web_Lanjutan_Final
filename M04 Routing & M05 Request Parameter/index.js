var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var list =[]

var logger = require('morgan');

app.use(logger("dev"));

app.use(express.static(__dirname + '/publik'));

app.get("/api/test", function(req, res){
    res.statusCode = 200;

    res.setHeader("Content-Type", "text/plain");
    res.send(req.params);
});

var data = bodyParser.urlencoded({extended: true});
app.post("/api/DataWarga",data,function(req, res){
    console.log('Got body:', req.body);
    list.push({
        name: req.body.nama,
        status: req.body.status 
        })    
        res.send(req.body);  
});

app.get('/api/get-data', (req, res,next) => {
    res.status(200).send(
	list[0]
    );
    console.log;
    name = req.query.list[0];
    status = req.query.list[1];
    res.send(status);
});



app.listen(4000,function(){
    console.log("Server run");
});