const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

let entries = [
  {
    _id:"1",
    staff:"PRAJAY",
    client:"Roopesh Shetty",
    destination:"Maldives",
    status:"Pending",
    remarks:"",
    updatedAt:new Date()
  }
];

/* GET DATA */
app.get("/api/entries",(req,res)=>{
  res.json(entries);
});

/* UPDATE REMARK */
app.post("/api/update-remark/:id",(req,res)=>{

  const id = req.params.id;
  const text = req.body.remark;

  const entry = entries.find(e=>e._id===id);

  if(!entry) return res.status(404).send("Not found");

  const time = new Date().toLocaleString();

  entry.remarks = (entry.remarks || "") +
  `\n[${time}] - ${text}`;

  entry.updatedAt = new Date();

  res.send("Updated");

});

app.listen(3000,()=>console.log("Server running on 3000"));