const express = require('express');
const app = express();
const hbs = require('hbs');
const fs = require('fs');


hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('currentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('capitalize', (text) => {
  return text.toUpperCase();
})

app.use((req, res, next)=>{
  var log = `${new Date().toString()}, Method : ${req.method} and Url : ${req.url}`;
  fs.appendFile('logFile.txt', log + '\n', (err)=>{
    console.log('Unable to append log to the file.');
  });
  next();
})

// app.use((req, res, next)=>{
//   res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('home.hbs', {
    title: "Faadoo Coupons",
    pageTitle: "Coupons and Deals Website.",
    welcomeMsg : "welcome to Home Page"
    //currentYear : new Date().getFullYear()
  })
});

app.get('/json', (req, res) => {
  res.send({
    name:"Chandel Kumar Gupta",
    Age: 26,
    likes: ['studying','politics']
  })
});

//app.get('/about', (req, res) => res.send('<h3>This is about us page..</h3>'));

app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle: "About Us Page",
    welcomeMsg : "welcome to About Us Page"
    //currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({
    statusCode:"NOT FOUND",
    description: "Unable to handle the request."
  })
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));