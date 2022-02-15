const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended :true}));

app.get("/" ,function(req,res){
res.sendFile(__dirname + "/index.html");

});

app.post("/" ,function(req , res){

const query = req.body.cityName;
const apikey = "deb59b0e75a51b4384262f635e252bf5";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apikey +"&units="+ unit;

https.get(url,function(response){
  console.log(response.statusCode);
  
  response.on("data",function(data){

    const weatherData = JSON.parse(data)
    const temp = weatherData.main.temp
    const weatherDescription = weatherData.weather[0].description
    const icon = weatherData.weather[0].icon
    const imageURL =  "http://openweathermap.org/img/wn/"+icon  + "@2x.png"

    res.write("<h1>The weather description currently is " + weatherDescription + ".</h1>");
    res.write("<h1>The temperature in "+ query + " is " + temp + "degree Celcius.</h1>");    //can have multiple res.write in a method.
    res.write("<img src="+ imageURL +">");
    res.send();   //can have only one res.send in a method.
   });
}) 

})

app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running at port 3000.");
});


