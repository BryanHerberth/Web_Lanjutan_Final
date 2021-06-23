var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var list =[]

var logger = require('morgan');

app.use(logger("dev"));

app.use(express.static(__dirname + '/publik'));

//Middleware cek nim
const myMiddleware = (req, res, next) => {
    if (req.params.name === "Bryan") {
      console.log("nama verified");
      next();
    } else {
      const err = {
        status: "error",
        data: {
            name: req.body.nama,
            
        },
      };
      next(err);
    }
  };

// app.get("/api/test", function(req, res){
//     res.statusCode = 200;

//     res.setHeader("Content-Type", "text/plain");
//     res.send(req.params);
// });

app.get("/api/:name/:status", myMiddleware, function (req, res) {
    res.statusCode = 200;
    //content-type pada expressjs
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



app.listen(5000,function(){
    console.log("Server run");
});