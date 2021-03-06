let bodyParser = require('body-parser');

var express = require('express');
var app = express();


// --> 7)  Mount the Logger middleware here
// works on glitch
// app.use(function(req, res, next){
//   console.log(req.method + ' ' + req.path + ' - ' + req.ip);
//   next();
// })


// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())


/** 1) Meet the node console. */
console.log("Hello world");

/** 2) A first working Express Server */
// app.get('/', function(req, res){
//   res.send('Hello Express')
// })


/** 3) Serve an HTML file */
app.get('/', function (req,res) { 
  res.sendFile(__dirname + '/views/index.html')
 })


/** 4) Serve static assets  */
app.use(express.static('public'));

/** 5) serve JSON on a specific route */
app.get('/json', function (req,res) { 
  res.json({"message": "Hello json"})
 });


/** 6) Use the .env file to configure the app */
//worked on glitch
// app.get('/json', (req, res) => {
//   let message = "Hello json"
  
//   if (process.env.MESSAGE_STYLE==='uppercase') {
//     return res.json({"message": message.toUpperCase()})
//   }
//   else {
//     return res.json({"message": message})
//   }
// })




/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
app.get('/now',function (req, res, next) { 
  req.time = new Date().toString()
  next();
 }, function (req,res) {
   res.send({
     time: req.time
   })
 });


/** 9)  Get input from client - Route parameters */
app.get('/:word/echo', function (req, res) { 
  // let word = requst.params.word
  let {word} = req.params //destructuring
  res.json({
    echo: word
  })
 })


/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get('/name',function (req,res) {
  let { first: firstname, last: lastname} = req.query
  res.json({
    name: `${firstname} ${lastname}`
  })
})


/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */
app.post('/name', function(req, res) {
  const {first: firstname, last: lastname} = req.body
  res.json({name: `${firstname} ${lastname}`})
})



// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;
