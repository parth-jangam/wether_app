// require('dotenv').config();
const express = require("express");
const app= express();
// const fs = require("fs");
var requests = require("requests");
const path= require('path')



app.set('view engine','hbs')
app.use(express.urlencoded({extended:false}))
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/city.html'))
})
app.post('/city',(req,res)=>{
  console.log(req.body.city_name)
    requests(
      // `http://api.openweathermap.org/data/2.5/weather?q=${req.body.city_name}&units=metric&appid=be6a06419c57b16869e403b71d88187f`

      // `http://api.openweathermap.org/geo/1.0/direct?q=${req.body.city_name}${req.body.state_code}${req.body.country_code}&limit=5&appid=be6a06419c57b16869e403b71d88187f`
        // ${req.body.city_name}
        `https://api.openweathermap.org/data/2.5/weather?q=${req.body.city_name},${req.body.state_code},${req.body.country_code}&appid=be6a06419c57b16869e403b71d88187f`
      )
        .on("data", (chunk) => {
          const objdata = JSON.parse(chunk);
          const arrData = [objdata];
          // 22 console.log(arrData[0].main.temp);
          
          // const realTimeData = arrData
          //   .map((val) => replaceVal(homeFile, val))
          //   .join("");
          // res.json(realTimeData);
          
          // const ral=arrData.map();
          res.render('index',{
            location: objdata.name,
            country :objdata.sys.country,
            tempval :(objdata.main.temp-273.15).toFixed(2),
            tempmin: (objdata.main.temp_min-273.15).toFixed(2),
            tempmax: (objdata.main.temp_max-273.15).toFixed(2),
          })
          // console.log(realTimeData);
        })
        // .on("end", (err) => {
        //   if (err) return console.log("connection closed due to errors", err);
        //   res.end();
        // });
})
app.get('/country_code',(req,res)=>{
  // res.sendFile(__dirname,'./counrtycode.html')
  res.sendFile(path.join(__dirname+'/countrycode.html'))
})
// const server = http.createServer((req, res) => {
//   // if(req.url=="/"){
//   //   res.writeHead(200,{
//   //       'Content-Type':'text/plain'
//   //   });
//   //   res.write()
//   // }  
//   if (req.url == "/city") {

//     requests(
//       `http://api.openweathermap.org/data/2.5/weather?q=Delhi&units=metric&appid=be6a06419c57b16869e403b71d88187f`
//     )
//       .on("data", (chunk) => {
//         const objdata = JSON.parse(chunk);
//         const arrData = [objdata];
//         // console.log(arrData[0].main.temp);
//         const realTimeData = arrData
//           .map((val) => replaceVal(homeFile, val))
//           .join("");
//         res.write(realTimeData);
//         // console.log(realTimeData);
//       })
//       .on("end", (err) => {
//         if (err) return console.log("connection closed due to errors", err);
//         res.end();
//       });
//   } else {
//     res.end("File not found");
//   }
// });

app.listen(8000,()=>{
    console.log("server listning")
});