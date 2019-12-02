const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});


app.post("/",function(req,res){

var firstname = req.body.fName;
var lastname = req.body.lNname;
var email = req.body.email;

var data = {
  members:[
    {
      email_address: email,
    status: "subscribed"
  }
  ]
};

var jsonData = JSON.stringify(data);

var option = {
  url:"https://us4.api.mailchimp.com/3.0/lists/7b80f67abe",
  method:"POST",
  headers: {
    "Authorization": "ajaypecv:9c4a21139dd9d53bfe5b10d54b257acc-us4/"
  },
  body: jsonData
};

request(option,function(error,response,body){
if(error){
res.sendFile(__dirname+"/failure.html");
}
else{
  if(response.statusCode === 200){
    res.sendFile(__dirname +"/succes.html");
  }else{
  res.sendFile(__dirname+"/failure.html");
  }
}
});
});


app.post("/failure",function(req,res){
res.redirect("/");
});

app.listen(3000,function(){
  console.log("Server running");
});


//9c4a21139dd9d53bfe5b10d54b257acc-us4
//7b80f67abe
