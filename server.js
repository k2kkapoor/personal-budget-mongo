//Budget API
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const mongoose = require("mongoose");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

let url = 'mongodb://localhost:27017/mongo-pb';

app.use(cors());
//const budget = require("./myBudget.json");
// const budget1 = {
//   myBudget: [
//     {
//       title: "Eat out",
//       budget: 60,
//     },
//     {
//       title: "Rent",
//       budget: 460,
//     },
//     {
//       title: "groceries",
//       budget: 110,
//     },
//   ],
// };

const budgetData = require("./models/budgetData")



app.get("/budget", (req, res) => {
  //console.log(budget);
  //res.send(budget);
  mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    budgetData.find({}).then((data) =>{
      res.json(data);
      mongoose.connection.close();
    }).catch((mongooseErr) => {
      res.status("200").send(mongooseErr);
    })
  })
  .catch((connectionErr) => {
    res.status("200").send(connectionErr);
  })
});


app.post("/add", (req,res)=>{
  mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    let addData = {$set:{
      title:req.body.title,
      budget:req.body.budget,
      color:req.body.color
    }}
    budgetData.update({title:req.body.title},addData,{upsert:true}).then((data) =>{
      mongoose.connection.close();
      res.json(data);
      
    }).catch((mongooseErr) => {
      res.status("200").send(mongooseErr);
    })
  })
  .catch((connectionErr) => {
    res.status("200").send(connectionErr);
  })
});

app.listen(port, () => {
  console.log(`API Serving at http://localhost:${port}`);
});
