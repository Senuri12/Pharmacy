

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('pharmacydb',['suppliers']);
var db1 = mongojs('pharmacydb',['orders']);

var bodyParser = require('body-parser');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


//for suppliers
app.get('/suppliers', function (req, res) {
    console.log("I received a GET request");
    db.suppliers.find(function(err, docs){
        console.log(docs);
        res.json(docs);
    });
});


app.post('/suppliers', (req,res)=>{
    console.log(req.body);
db.suppliers.insert(req.body,(err,doc)=>{
    res.json(doc);
    });
});

app.delete('/suppliers/:id', function(req,res){
    var id = req.params.id;
    console.log(id);
    db.suppliers.remove({_id: mongojs.ObjectId(id)},function(err,doc){
        res.json(doc);
    });
});

app.get('/suppliers/:id',function(req,res){
    var id = req.params.id;
    console.log(id);
    db.suppliers.findOne({_id: mongojs.ObjectId(id)},function(err,doc){
        res.json(doc);
    });
});

app.put('/suppliers/:id', function(req,res){
    var id = req.params.id;
    console.log(req.body.name);
    db.suppliers.findAndModify({query: {_id: mongojs.ObjectId(id)},
            update: {$set: {sid: req.body.sid, name: req.body.name, drug_types: req.body.drug_types, address: req.body.address, contact: req.body.contact,  status: req.body.status}}, new: true},
        function(err,doc){
            res.json(doc);
        }
    );
});

//for orders
app.post('/orders', (req,res)=>{
    console.log(req.body);
db2.orders.insert(req.body,(err,doc)=>{
    res.json(doc);
});
});

app.delete('/orders/:id', function(req,res){
    var id = req.params.id;
    console.log(id);
    db2.orders.remove({_id: mongojs.ObjectId(id)},function(err,doc){
        res.json(doc);
    });
});

app.get('/orders/:id',function(req,res){
    var id = req.params.id;
    console.log(id);
    db2.orders.findOne({_id: mongojs.ObjectId(id)},function(err,doc){
        res.json(doc);
    });
});

app.put('/orders/:id', function(req,res){
    var id = req.params.id;
    console.log(req.body.name);
    db2.orders.findAndModify({query: {_id: mongojs.ObjectId(id)},
            update: {$set: {oid: req.body.oid, des: req.body.des, supplier: req.body.supplier, status: req.body.status}}, new: true},
        function(err,doc){
            res.json(doc);
        }
    );
});



app.listen(3000);
console.log("server running on port 3000");

