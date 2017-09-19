const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const potnumber = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs'); // to tell express which view engine we would like to use

app.use((req, res, next) => {
  var now = new Date().toString();
  var myLog = `${now}: ${req.method} ${req.url}`;
  console.log(myLog);
  fs.appendFile('server.log', myLog + '\n', (err) => {
    if (err) {
      console.log('Unabale to append server.log');
    }
  });
  next();
});

// app.use((req, res, next)=>{
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // if you want to send simple text or html then use following
  // res.send('<h1>Hello Sunny\'s Express</h1>');

  // if you want to send JSON then use following
  /*res.send({
    name: 'Sunny',
    likes: [
      'Mountains',
      'Hiking',
      'Veg Food'
    ]
  })
  */
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to Mywebsite'
  });
});

app.get('/about', (req, res) => {
  //res.send('Its all about Sunny');
  //or
  //res.render('about.hbs');
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Something went bad'
  });
});

app.listen(potnumber, () => {
  console.log(`Server is up and running on port ${potnumber}.`);
});
