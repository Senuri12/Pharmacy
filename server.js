'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const app = express();
app.use(bodyParser.json());

//connecting to database
mongoose.connect('mongodb://localhost:27017/pharmacy', err => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
});


//loading homepage
app.use(express.static(__dirname + "/public"));

//vikum

//schema of the stock table
var drug_stockSchema = new mongoose.Schema({
    drug_stock_id : {
        type: Number,
        autoIncrement: true
    },
    drug_stock_name : String,
    drug_stock_unit_type : String,
    drug_stock_category : String,
    drug_stock_price : {
        type: Number
    },
    drug_stock_quantity : {
        type: Number
    },
    drug_stock_supp_id : {
        type: Number
    }
});

var drug_stock = mongoose.model('drug_stock', drug_stockSchema);

// var drug_data1 = new drug_stock({
//     drug_stock_id : 1,
//     drug_stock_name : "Afrin",
//     drug_stock_unit_type : "Tab",
//     drug_stock_category : "Narcotics",
//     drug_stock_price : 45.65,
//     drug_stock_quantity : 500,
//     drug_stock_supp_id : 1
// });
//
// drug_data1.save();
//
// var drug_data2 = new drug_stock({
//     drug_stock_id : 329,
//     drug_stock_name : "Captopril",
//     drug_stock_unit_type : "Tab",
//     drug_stock_category : "Narcotics",
//     drug_stock_price : 65.65,
//     drug_stock_quantity : 200,
//     drug_stock_supp_id : 1
// });
//
// drug_data2.save();


//Drug requests schema

//schema of the Drug Request table

var DrugReqSchema = new mongoose.Schema({
    Request_ID:String,
    Drug_ID: String,
    Drug_Name : String,
    Requested_Quantity :Number,
    Available_Quantity:Number,
    Date:String,
    Status:String,
    Approved_Quantity:Number,
});
var Drug_Request = mongoose.model("Drug_Request", DrugReqSchema);
var dr1 =new Drug_Request({Request_ID:'505',Drug_ID: '525',Drug_Name: "Tramadol",Requested_Quantity: '100',Available_Quantity: '500',Date: "2013/07/10",Department: "IPD Pharmacy",Status: "pending",Approved_Quantity: '0'});

//var dr1 =new Drug_Request({drug_stock_id : '111232',Request_ID:'25',Drug_ID: '22',Drug_Name: "Captopril",Requested_Quantity: '100',Available_Quantity: '500',Date: "2013/10/10",Department: "IPD Pharmacy",Status: "pending",Approved_Quantity: '100'});
dr1.save();



//schema of the drug table
var dListSchema = mongoose.Schema({
    dud:String,
    dName:String,
    dUnit:String,
    dPrice:Number,
    dCategoryid:String,
    dCategoryName:String,
    dRemarks:String,
    dStatusDanger:Number,
    dStatusOrder:Number,
    dQuantitiy:Number,
    dType:String

});
var drugList = mongoose.model('druglist', dListSchema);
//var dl =new drugList({dName:"Aygestin (Norethindrone)- Multum",dUnit: '10',dPrice: '10',dCategoryid: '10',dCategoryName: "abc",dRemarks: "Cards",dStatusDanger: '3',dStatusOrder: '10',dQuantitiy: '8',dType:"cartoons"});
//var dl =new drugList({dName:"Acitrntine(Soriatane)50mg",dUnit: '10',dPrice: '10',dCategoryid: '10',dCategoryName: "Naroctics",dRemarks: "Cards",dStatusDanger: '3',dStatusOrder: '10',dQuantitiy: '8',dType:"cartoons"});

//dl.save();




//schema of the drug batch table
var DrugBatchSchema = new mongoose.Schema({
    Drug_Category:String,
    Drug_Name: String,
    Batch_Number : String,
    Type :String,
    Content:String,
    Content_Type:String,
    Number_of_Cartoons:Number,
    Number_of_Cards_per_Cartoon:Number,
    Number_of_Tablets_per_Card:Number,
    Quantity:Number,
    Manufacture_Date:String,
    Expire_Date:String

});
var Drug_Batch = mongoose.model("Drug_Batch", DrugBatchSchema);
var drugSchema = mongoose.Schema({
    did:String,
    dname:String,
    dqty:Number,
    dremark:String,
    dcreateDate:String,
    dcreateuser:String,
    dupdate:String,
    dLastUpdateUser:String,
    dActive:Number,
    dDosage:String,
    dFrequency:String,
    dType:String


});
var   drugs = mongoose.model('drug', dListSchema);
/*

var dr1 =new Drug_Batch({Drug_Category:"Narcotics",Drug_Name: "Acitrntine(Soriatane)50mg",Batch_Number: "B1",Type: "Cartoons",Content: "Tables",Content_Type: "Cards",Number_of_Cartoons: '3',Number_of_Cards_per_Cartoon: '10',Number_of_Tablets_per_Card: '8',Quantity: '240',Manufacture_Date: "2015-09-08",Expire_Date: "2015-10-09"});
 dr1.save();
*/






app.get('/drugstock', function (req, res) {
    drug_stock.find(function (err, data) {
        if (err)
            console.log(err)    ;
        res.json(data);

    })
});

app.post('/drugstockA/:drugId/:reqQuantity/:date/:ids', function (req, res) {

    var xy = req.params.drugId;
    var xy2 = req.params.reqQuantity;
    var date =req.params.date;
    var rid = req.params.ids;

    console.log(rid);
    drug_stock.findById(xy,function (err,data) {
        if(err){
            console.log(err)
        }
        else{
            Drug_Request.find({Drug_ID:data.drug_stock_id},function (err,datas){

                if(datas.length==0){
                    console.log("haha");
                    var dr1 =new Drug_Request(
                        {   Request_ID:rid,
                            Drug_ID: data.drug_stock_id,
                            Drug_Name: data.drug_stock_name,
                            Requested_Quantity: xy2,
                            Available_Quantity: data.drug_stock_quantity,
                            Date: date,
                            Status: "pending",
                            Approved_Quantity: 0
                        });
                    dr1.save(function (err) {
                        console.log(err);
                    })
                }
                else {
                    res.json(datas);
                }
            });




        }
    })


});

app.delete('/drugstockA/:drugId', function (req, res) {

    var xy = req.params.drugId;
    console.log(rid);
    drug_stock.findById(xy,function (err,data) {
        if(err){
            console.log(err)
        }
        else{
            Drug_Request.remove({Drug_ID:data.drug_stock_id},function (err,datas){

            });

        }
    })


});



app.get('/drugstock', function (req, res) {
    drug_stock.find(function (err, data) {
        if (err)
            console.log(err)    ;
        res.json(data);

    })
});


app.get('/drugstock/:id', function (req, res) {
    drug_stock.find({drug_stock_id:req.params.id},function (err, data) {
        if (err)
            console.log(err)    ;
        res.json(data);

    })
});

app.post('/drugstockA/:drugId/:reqQuantity/:date/:ids', function (req, res) {

    var xy = req.params.drugId;
    var xy2 = req.params.reqQuantity;
    var date =req.params.date;
    var rid = req.params.ids;

    console.log(rid);
    drug_stock.findById(xy,function (err,data) {
        if(err){
            console.log(err)
        }
        else{
            Drug_Request.find({Drug_ID:data.drug_stock_id},function (err,datas){

                if(datas.length==0){
                    console.log("haha");
                    var dr1 =new Drug_Request(
                        {   Request_ID:rid,
                            Drug_ID: data.drug_stock_id,
                            Drug_Name: data.drug_stock_name,
                            Requested_Quantity: xy2,
                            Available_Quantity: data.drug_stock_quantity,
                            Date: date,
                            Status: "pending",
                            Approved_Quantity: 0
                        });
                    dr1.save(function (err) {
                        console.log(err);
                    })
                }
                else {
                    res.json(datas);
                }
            });




        }
    })


});

app.delete('/drugstockA/:drugId', function (req, res) {

    var xy = req.params.drugId;

    drug_stock.findById(xy,function (err,data) {
        if(err){
            console.log(err)
        }
        else{
            Drug_Request.remove({Drug_ID:data.drug_stock_id},function (err,datas){

            });

        }
    })


});

app.get('/prescription', function (req, res) {
    Prescription.find(function (err, data) {
        if (err)
            console.log(err)    ;
        res.json(data);

    })
});

app.get('/prescriptionback', function (req, res) {
    PrescriptionBackup.find(function (err, data) {
        if (err)
            console.log(err)    ;
        res.json(data);

    })
});

app.get('/viaPatient/:id', function (req, res) {
    Prescription.find({Patient_ID:req.params.id},function (err, data) {
        if (err)
            console.log(err)    ;
        res.json(data);

    })
});

app.get('/searchpresciption/:a', function (req, res) {
    Prescription.find({Prescription_ID:req.params.a},function (err, data) {
        if (err)
            console.log(err)    ;
        res.json(data);

    })
});

app.get('/searchpresciptionA/:b', function (req, res) {
    PrescriptionBackup.find({Prescription_ID:req.params.b},function (err, data) {
        if (err)
            console.log(err)    ;
        res.json(data);

    })
});


app.get('/dispense/:dispid', function (req, res) {

    dispanse.find({Prescription_ID:req.params.dispid},function (err, data) {
        if (err)
            console.log(err)    ;
        res.json(data);

    });

});

app.post('/dispensehandle/:dispid/:drugname/:quantity', function (req, res) {

    Prescription.find({Prescription_ID:req.params.dispid},function (err, data) {
        if (err)
            console.log(err)    ;
        var pres =new PrescriptionBackup(
            {
                Patient_ID:data.Patient_ID,
                Prescription_ID: data.Prescription_ID,
                Create_Date : data.Create_Date,
                Prescription_Date :data.Prescription_Date
            });
        pres.save();
        Prescription.remove({Prescription_ID:req.params.dispid},function (err, data) {
        })



        dispanse.find({Prescription_ID:req.params.dispid},function (err, data) {
            if (err)
                console.log(err)    ;
            res.json(data);

        });


    })

    dispanse.find({Prescription_ID:req.params.dispid},function (err,doc) {
        var dr2 =new dispansebackup(
            {
                Prescription_ID: doc.Prescription_ID,
                Drug_name : doc.Drug_name,
                Dosage:doc.Dosage,
                frequncy :doc.frequncy,
                period : doc.period,
                quantity:doc.quantity
            });
        dr2.save();
        dispanse.remove({Prescription_ID:req.params.dispid},function (err, data) {
            if (err)
                console.log(err);
        });

    })
});


app.put('/updating/:drugname/:quantity',function (req,res) {

    drug_stock.findOne({drug_stock_name: req.params.drugname}, function(err, doc){
        if(err){
            console.log("Something wrong when updating data!");
        }

        var val = doc.drug_stock_quantity-req.params.quantity;
        drug_stock.findOneAndUpdate({drug_stock_name: req.params.drugname}, {$set:{drug_stock_quantity : val}}, {new: true}, function(err, doc){
            if(err){
                console.log("Something wrong when updating data!");
            }

            console.log(doc);
        });
    });



});




var PrescriptionSchema = new mongoose.Schema({
    Patient_ID:String,
    Prescription_ID: String,
    Create_Date : String,
    Prescription_Date :String
});
var Prescription = mongoose.model("Prescription", PrescriptionSchema);
var PrescriptionBackup = mongoose.model("PrescriptionBackup", PrescriptionSchema);

//
// var dr1 =new Prescription(
//  {
//      Patient_ID:"PA001",
//      Prescription_ID: "PRE001",
//      Create_Date : "2017-02-22",
//      Prescription_Date :"2017-02-22"
//  });
// dr1.save();
// var dr2 =new Prescription(
//     {
//         Patient_ID:"PA002",
//         Prescription_ID: "PRE002",
//         Create_Date : "2017-02-23",
//         Prescription_Date :"2017-02-23"
//     });
// dr2.save();
// var dr15 =new Prescription(
//  {
//      Patient_ID:"PA001",
//      Prescription_ID: "PRE003",
//      Create_Date : "2017-02-22",
//      Prescription_Date :"2017-02-22"
//  });
// dr15.save();

var DispenseSchema = new mongoose.Schema({
    Prescription_ID: String,
    Drug_name : String,
    Dosage:Number,
    frequncy :Number,
    period : Number,
    quantity:Number

});
var dispanse = mongoose.model("dispanse", DispenseSchema);
var dispansebackup = mongoose.model("dispansebackup", DispenseSchema);

//
// var dr6 =new dispanse(
//     {
//         Prescription_ID: "PRE001",
//         Drug_name : "Captopril",
//         Dosage:2,
//         frequncy :3,
//         period : 3,
//         quantity:18
//     });
//
// var dr2 =new dispanse(
//     {
//         Prescription_ID: "PRE002",
//         Drug_name : "Captopril",
//         Dosage:2,
//         frequncy :3,
//         period : 2,
//         quantity:12
//     });
//
// var dr3 =new dispanse(
//     {
//         Prescription_ID: "PRE003",
//         Drug_name : "Afrin",
//         Dosage:2,
//         frequncy :2,
//         period : 5,
//         quantity:20
//     });
// dr6.save();
// dr3.save();
// dr2.save();

// var dr1 =new Drug_Request(
//  {Request_ID:"24",
//     Drug_ID: "003",
//     Drug_Name: "VitaminC",
//     Requested_Quantity: 100,
//     Available_Quantity: 45,
//     Date: "2017/02/03",
//     Status: "pending",
//     Approved_Quantity: 0});
//
// dr1.save()







//
//
//
// var drug_data1 = new drug_stock({
//     drug_stock_id : 1,
//     drug_stock_name : "Afrin",
//     drug_stock_unit_type : "Tab",
//     drug_stock_category : "Narcotics",
//     drug_stock_price : 45.65,
//     drug_stock_quantity : 500,
//     drug_stock_supp_id : 1
// });
//
// drug_data1.save();
//
// var drug_data2 = new drug_stock({
//     drug_stock_id : 329,
//     drug_stock_name : "Captopril",
//     drug_stock_unit_type : "Tab",
//     drug_stock_category : "Narcotics",
//     drug_stock_price : 65.65,
//     drug_stock_quantity : 200,
//     drug_stock_supp_id : 1
// });
//
// drug_data2.save();
//








//SENURI
//Drug Request

//get all the bending drug requests
app.get('/api/drug_requests', function(req, res){
    //  res.send('hello world');
    Drug_Request.find(({Status:"pending"}),function (err,data) {
         console.log(err);
        console.log(data);

        res.json(data);

    })
});

//update the status approved when a request was approved
app.put('/drug_requests/',function (req,res) {

    for(var key in req.body) {
        console.log(req.body[key].Request_ID);

        Drug_Request.findOneAndUpdate({"Request_ID": req.body[key].Request_ID}, {"$set": {"Status": "Approved"}}).exec(function (err, book) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(book);
            }
        });
    }
})



//update the drug stock table  when a request was approved
app.put('/drug_stock/',function (req,res) {

    for(var key in req.body) {
        console.log(req.body[key].Request_ID);

        var calculated= req.body[key].Available_Quantity - req.body[key].Approved_Quantity;

        console.log("calculated: " +calculated);


        drug_stock.findOneAndUpdate({"_id": req.body[key].drug_stock_id}, {"$set": {"drug_stock_quantity": calculated}}).exec(function (err, book) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(book);
            }
        });
    }
})



//drug approval finish

//add druug batch details

//get all the drug categories
app.get('/druglists', function(req, res){
    drugList.find({},'dCategoryName',function (err,data) {
         console.log(data);
        res.json(data);

    })
});


//get drug type and drug name according to drug category
app.post("/api/druglists/", function(req, res){
    var name=req.body.dCategoryName;
    console.log("hey");

    console.log(name);

    drugList.find(({"dCategoryName":name}),function (err,data) {
        console.log(data);

        console.log("in");
        res.json(data);

    })
});

//add the drug batch details
app.post("/api/drug_batches/" , function (req,res) {
    console.log(req.body.Manufacture_Date);
    var btch =new Drug_Batch();

    btch.Drug_Name=req.body.dCategoryName.dCategoryName;
    btch.Drug_Category=req.body.dCategoryName.dCategoryName;
    btch.Batch_Number=req.body.Batch_Number;
    btch.Type=req.body.dType.dType;
    btch.Content_Type=req.body.Content_Type;
    btch.Content=req.body.Content;
    btch.Number_of_Cartoons=req.body.Number_of_Cartoons;
    btch.Number_of_Cards_per_Cartoon=req.body.Number_of_Cards_per_Cartoon;
    btch.Number_of_Tablets_per_Card=req.body.Number_of_Tablets_per_Card;
    btch.Quantity=req.body.Quantity;
    btch.Manufacture_Date=req.body.Manufacture_Date;
    btch.Expire_Date=req.body.Expire_Date;

    console.log(req.body.Content_Type);

    btch.save(function(err,doc) {
        if (err) {
            console.log("error saving video");
        }
        else {
            res.json(doc);
        }

    })
});

//finish add drug batch details




//drug request history


//drug request history and all
app.get('/api/drug_requests', function(req, res){
    Drug_Request.find(function (err,data) {
        console.log("new requests");
        console.log(data);
        res.json(data);

    })
});


//yom

//Uthpala
//Schemas
// const autoIncrement = require('mongodb-autoincrement');
var SuppliersSchema = new mongoose.Schema({
    supp_id: {
        type: Number

    },
    supp_name: {
        type: String

    },
    supp_address: {
        type: String
    },
    supp_email: {
        type: String
    },
    supp_contact: {
        type: String
    },
    supp_reg_date: {
        type: String
    },
    supp_drugs: {
        type: Array

    },
    supp_availability: {
        type: Number

    }
});

// SuppliersSchema.plugin(autoIncrement.mongoosePlugin);
var supplier = mongoose.model('supplier', SuppliersSchema);

var TransfersSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    stock_transfer_purchase_id: {
        type:  Number

    },
    stock_transfer_supp_id: {
        type:  Number
    },
    stock_transfer_drug_id: {
        type:  Number
    },
    stock_transfer_qty: {
        type: Number
    },
    stock_transfer_status: {
        type: String
    },
    stock_transfer_date: {
        type: Date

    }
});

// TransfersSchema.plugin(autoIncrement.mongoosePlugin);
var transfer = mongoose.model('transfers',TransfersSchema);

var PurchasesSchema = new mongoose.Schema({

    _id: {
        type: Number
    },
    stock_purchase_supp_id: {
        type:  Number

    },
    stock_purchase_drug_id : {
        type:  Array
    },
    stock_purchase_qty: {
        type: Array
    },
    tock_purchase_unit_price: {
        type: Array
    },
    stock_purchase_tot: {
        type: Number
    },

    stock_purchase_date: {
        type: Date
    },
    stock_purchase_status: {
        type: String
    }

});

// PurchasesSchema.plugin(autoIncrement.mongoosePlugin);
var purchase = mongoose.model('purchases',PurchasesSchema);


//Data
var transfer_data1 = new transfer({
    _id : 1,
    stock_transfer_purchase_id : 1,
    stock_transfer_supp_id : 1,
    stock_transfer_drug_id : [
        1,
        2
    ],
    stock_transfer_qty : [
        100,
        200
    ],
    stock_transfer_status : "Transfered",
    stock_transfer_date : "2017-01-08T08:10:06.000Z"
});



var transfer_data2 = new transfer({
    _id : 2,
    stock_transfer_purchase_id : 2,
    stock_transfer_supp_id : 3,
    stock_transfer_drug_id : [
        10,
        5
    ],
    stock_transfer_qty : [
        100,
        200
    ],
    stock_transfer_status : "Transfered",
    stock_transfer_date : "2017-02-08T08:11:06.000Z"
});
transfer_data1.save();
transfer_data2.save();


var supp_data1 = new supplier({
    supp_id : 1,
    supp_name : "R&S Co. LTD",
    supp_address : "Anura Rd, Colombo 07",
    supp_email : "rd@gmail.com",
    supp_contact : "071-3457889",
    supp_reg_date : "20-06-2017",
    supp_drugs : [
        1,
        7,
        9,
        2
    ],
    supp_availability : true

});


var supp_data2 = new supplier({
    supp_id : 2,
    supp_name : "Hemas LTD",
    supp_address : "Galle Road, Colombo 02",
    supp_email : "hemas@gmail.com",
    supp_contact : "075-3411119",
    supp_reg_date : "22-06-2017",
    supp_drugs : [
        1,
        3,
        9,
        6
    ],
    supp_availability : true

});



var supp_data3 = new supplier({
    supp_id : 3,
    supp_name : "Ceylon Health LTD",
    supp_address : "Galle Road, Colombo 06",
    supp_email : "ceylonh@gmail.com",
    supp_contact : "011-2012907",
    supp_reg_date : "25-06-2017",
    supp_drugs : [
        4,
        8,
        9,
        11,
        6
    ],
    supp_availability : false

});
supp_data1.save();
supp_data2.save();
supp_data3.save();

var pur_data1 = new purchase({
    _id : 1,
    stock_purchase_supp_id : 1,
    stock_purchase_drug_id : [
        1,
        2
    ],
    stock_purchase_qty : [
        100,
        200
    ],
    stock_purchase_unit_price : [
        45.12,
        20.67
    ],
    stock_purchase_tot : 14960.0,
    stock_purchase_date : "2017-01-05T09:33:06.000Z",
    stock_purchase_status : "Recieved"
});

var  pur_data2 = new purchase({
    _id : 2,
    stock_purchase_supp_id : 3,
    stock_purchase_drug_id : [
        10,
        5
    ],
    stock_purchase_qty : [
        100,
        200
    ],
    stock_purchase_unit_price : [
        50.0,
        20.0
    ],
    stock_purchase_tot : 7000.0,
    stock_purchase_date : "2017-02-05T06:30:23.000Z",
    stock_purchase_status : "Recieved"
});

var  pur_data3 = new purchase({
    _id : 3,
    stock_purchase_supp_id : 3,
    stock_purchase_drug_id : [
        6,
        7
    ],
    stock_purchase_qty : [
        200,
        400
    ],
    stock_purchase_unit_price : [
        70.12,
        20.67
    ],
    stock_purchase_tot : 14000.0,
    stock_purchase_date : "2017-07-01T09:33:06.000Z",
    stock_purchase_status : "Pending"
});

pur_data1.save();
pur_data2.save();
pur_data3.save();

//Yomali
/*app.get('/api/drugs', function (req, res) {
 drugs.find(function (err, data) {
 if (err)
 console.log(err)    ;
 res.json(data);
 })
 });*/   app.get('/api/drugs', function (req, res) {
    drugs.find(function (err, data) {
        if (err)
            console.log(err)    ;
        res.json(data);
    })
});

app.post('/api/drugs',function(req,res){
    console.log(req.body.did)
    var newDrugs = new drugs();
    newDrugs.id = req.body.did;
    newDrugs.name = req.body.dname;
    newDrugs.qty= req.body.dqty;
    newDrugs.remark=    req.body.dremark;
    newDrugs.cDate=    req.body.dcreateDate;
    newDrugs.cUser=  req.body.dcreateuser;
    newDrugs.lupdate=req.body.dupdate;
    newDrugs.lUser= req.body.dLastUpdateUser;
    newDrugs.active= req.body.dActive;
    newDrugs.dosage= req.body.dDosage;
    newDrugs.frequeny=req.body.dFrequency;
    newDrugs.type=req.body.dType;

    newDrugs.save(function (err,doc) {
        if(err){
            console.log(err)
        }
        else
        {
            res.json(doc)
        }
    });

});
app.get('/api/druglists', function(req, res){
    drugList.find({},'dCategoryName',function (err,data) {
        // console.log(data);
        res.json(data);

    })
});
/*app.post("/api/druglists/", function(req, res){
 var name=req.body.dCategoryName;
 console.log("hey");
 // console.log("abc");
 console.log(name);

 drugList.find(({"dCategoryName":name}),function (err,data) {dru

 console.log("in");
 res.json(data);

 })
 });*/
app.get("/api/druglists/", function(req, res){
    //  var cname=req.body.dCategoryName;
    var name=req.body.dName;
    /* var type=req.body.dUnit;
     var price=req.body.dPrice;
     var Rlevel=req.body.dStatusOrder;
     var Dlevel=req.body.dStatusDanger;
     var remark=req.body.dRemarks;
     */
    console.log("check");

    console.log(name);

    drugList.find(({"dName":name}),function (err,data) {
        console.log(data);

        console.log("in2");
        res.json(data);

    })
});
app.get('/api/Drug_Batch', function(req, res){
    Drug_Batch.find({},'Drug_Category',function (err,data) {
        // console.log(data);
        res.json(data);

    })
});
app.get("/api/druglists/", function(req, res){
    var name=req.body.dCategoryName;
    console.log("hey");
    // console.log("abc");
    console.log(name);

    Drug_Batch.find(({"dCategoryName":name}),function (err,data) {
        console.log(data);

        console.log("in");
        res.json(data);

    })
});
app.put('/druglists/:id',function (req,res) {
    var id=req.params.id;
    drug.findByIdAndUpdate(id,{$set:{dUnit:req.body.dUnit,dPrice:req.body.dPrice,dStatusOrder:req.body.dStatusOrder,dStatusDanger:req.body.dStatusDanger}},
        {new:true},function (err,doc) {
            if(err){
                res.send("error updating")
            }
            else{
                res.json(doc);
            }
        })
})
app.get('/api/Drug_Batch', function(req, res){
    Drug_Batch.find({},function (err,data) {
        // console.log(data);
        res.json(data);

    })
});

app.delete('/Drug_Batch/:x', function (req, res) {
    Drug_Batch.remove({ _id: req.params.x }, function (err) {
        if (err)
            console.log(err);

        Drug_Batch.find(function (err, data) {
            if (err)
                console.log(err)    ;
            res.json(data);
        })

    });
});
app.get('/Drug_Batch/:id',function (req,res) {
    var id=req.params.id;
    console.log(id);
    Drug_Batch.findOne({_id:mongoose.ObjectId(id)},function (err,doc) {
        res.json(doc);
    })
})
app.put('/Drug_Batch/:id',function (req,res) {
    var id=req.params.id;
    drug.findByIdAndUpdate(id,{$set:{Drug_Name:req.body.Drug_Name,Batch_Number:req.body.Batch_Number}},
        {new:true},function (err,doc) {
            if(err){
                res.send("error updating")
            }
            else{
                res.json(doc);
            }
        })
})


//get all suppliers
app.get('/suppliers', function (req, res) {
    supplier.find(function (err, data) {
        if (err)
            console.log(err);
        res.json(data);

    })
});

//
// app.post('/suppliers', function(req, res){
//     //  res.send('hello world');
//     supplier.insert(req.body,(err,doc)=>{
//         res.json(doc);
// });
// });


//add a supplier
app.post('/suppliers',function(req,res){
    // console.log(req.body._id);
    var newSup = new supplier();

    newSup.supp_id = req.body._id;
    newSup.supp_name = req.body.supp_name;
    newSup.supp_address = req.body.supp_address;
    newSup.supp_contact = req.body.supp_contact;
    newSup.supp_availability =1;
    newSup.supp_drugs = req.body.supp_drugs;

    newSup.save(function (err,doc) {
        if(err){
            console.log(err)
        }
        else
        {
            res.json(doc)
        }
    });

});

//delete supplier
// app.delete('/suppliers/:id', function (req, res) {
//     supplier.remove({ _id: req.params._id }, function (err) {
//         if (err)
//             console.log(err);
//
//         supplier.find(function (err, data) {
//             if (err)
//                 console.log(err)    ;
//             res.json(data);
//         })
//
//     });
// });

//delete supplier
app.put('/suppliers/:id',function (req,res) {
    var id=req.params._id;
    supplier.findByIdAndUpdate(id,{$set:{supp_availability:0}},
        {new:true},function (err,doc) {
            if(err){
                res.send("error updating")
            }
            else{
                res.json(doc);
            }
        })
});


//update supplier
app.put('/suppliers/:id',function (req,res) {
    var id=req.params._id;
    supplier.findByIdAndUpdate(id,{$set:{supp_name:req.body.supp_name,supp_address:req.body.supp_address,supp_contact:req.body.supp_contact,supp_drugs:req.body.supp_drugs}},
        {new:true},function (err,doc) {
            if(err){
                res.send("error updating")
            }
            else{
                res.json(doc);
            }
        })
});

//get supplier by id
app.get('/suppliers', function(req, res){
    //  res.send('hello world');
    supplier.find(({_id:res._id}),function (err,data) {
        console.log(err);
        console.log(data);

        res.json(data);

    })
});

//add a transfer
app.post('/transfers',function(req,res){
    // console.log(req.body._id);
    var newTrans = new transfer();

    newTrans._id = req.body._id;
    newTrans.stock_transfer_purchase_id = req.body.stock_transfer_purchase_id;
    newTrans.stock_transfer_supp_id= req.body.stock_transfer_supp_id;
    newTrans.stock_transfer_drug_id = req.body.stock_transfer_drug_id;
    newTrans.stock_transfer_qty = req.body.stock_transfer_qty;
    newTrans.stock_transfer_status = req.body.stock_transfer_status;
    newTrans.stock_transfer_date = req.body.stock_transfer_date;

    newTrans.save(function (err,doc) {
        if(err){
            console.log(err)
        }
        else
        {
            res.json(doc)
        }
    });

});


//add a purchase
// app.post('/purchases',function(req,res){
//     // console.log(req.body._id);
//     var newTrans = new transfer();
//
//     newTrans._id = req.body._id;
//     newTrans.stock_transfer_purchase_id = req.body.stock_transfer_purchase_id;
//     newTrans.stock_transfer_supp_id= req.body.stock_transfer_supp_id;
//     newTrans.stock_transfer_drug_id = req.body.stock_transfer_drug_id;
//     newTrans.stock_transfer_qty = req.body.stock_transfer_qty;
//     newTrans.stock_transfer_status = req.body.stock_transfer_status;
//     newTrans.stock_transfer_date = req.body.stock_transfer_date;
//
//     newTrans.save(function (err,doc) {
//         if(err){
//             console.log(err)
//         }
//         else
//         {
//             res.json(doc)
//         }
//     });
//
// });






//finish drug request history
app.listen(3000, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('app listening on port 3000');
});






