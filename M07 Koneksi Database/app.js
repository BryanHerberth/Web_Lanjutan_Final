var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sql = require('./Database/db.js')
var list =[]

var logger = require('morgan');

app.use(logger("dev"));

app.use(express.static(__dirname + '/publik'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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



app.get("/api/DataWarga/:name/:status", myMiddleware, function (req, res) {
    sql.query("SELECT * FROM mahasiswa", (err, rows) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        res.json(
            rows
        )
    });    
  });


app.post("/api/DataWarga",function(req, res){
    console.log('Got body:', req.body);
 
        
    sql.query("INSERT INTO mahasiswa(nama,no_hp,status) values(?,?,?)",[req.body.nama,req.body.hp,req.body.status], (err, row) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        res.json({
            id : row.insertId,
            name : req.body.nama,
            hp : req.body.hp,
            status : req.body.status
        });  
    });
     
        
});



app.put("/api/DataWarga/:name/:status/:id", myMiddleware, function (req, res) {
    console.log(req.body)
    sql.query("UPDATE mahasiswa SET nama = ? , no_hp =? , status = ? WHERE ID = ?",[req.body.nama,req.body.hp,req.body.status,req.params.id], (err, rows) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        res.json(
            rows
        )
    });    
  });

app.delete("/api/DataWarga/:name/:status/:id", myMiddleware, function (req, res) {
    console.log(req.body)
    sql.query(`DELETE from mahasiswa WHERE ID = ${req.params.id}`, (err, rows) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        res.json(
            rows
        )
    });    
  });

app.listen(5000,function(){
    console.log("Server run");
});