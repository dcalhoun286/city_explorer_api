'use strict';

/*
==================== Servers =======================
A server needs to respond to information on the internet
When information is sent on th einternet it primarily uses http
http is a way to encode data and send it in a uniform way so everyoen can tlak. It's like the alphabet of talking on the internet

The job of talking over http, and especially listening for http requests is handled by Express
It gets translated by express into javascript

http requests contain a lot of info
The basics are a lot like mail
there is an address: url
there is a to and a from    to: route, from: client url
There can be a letter inside: encode information completely hidden in the response - like a letter in the envelope
There can be info written on the outside of the letter - this is our queries - info on the visible url

Express reads all of this for us and much more


==================== Environment ===============
A server has to run somewhere
Heroku, AWS, terminal
The server needs to run on a PORT on our local we use 3000, 3001, heroku tends to graitate towards like 27000 - 32000

We will create dynamic variables instead of hard coded ones that our server can read live.
These variables make up / live in our environment
not goDaddy (goDaddy is a DNS, redirects to where it lives)
*/

// =================== end theory ===================
// ========= packages ==============
const express = require('express'); // implies that exress has been downloaded via npm
// the command to download it and save it is 'npm install -S express'
const cors = require('cors'); // Cross Origin Resource Sharing: allows connections between 2 local servers or websites. It can block or allow access to any list of urls. By default it allows localhost to talk to itself
// - needed this week only
require('dotenv').config(); // runs once and loads all the environment variables IF they were declared in a file instead of the terminal

// ========= setup the application (server) =========
const app = express(); // creates a server from the express library
app.use(cors()); // app.use loads middleware - we are loading cors so that requests don't get blocked when they are local

// ========== other global variables =========
const PORT = process.env.PORT || 3111; // all caps because it is a variable future devs should not touch
// magic variables (other things rely on this variable)
// process.env.PORT references the PORT env variable from my terminal

// ======= Routes ==========

//app.get : attaches a listener of method type GET to the server with a (route, and a callback)
// '/' : route - we can visit the server at localhost:3000 or localhost:3000/ and trigger this callback
// (request, response) => : the callback function, think of it as (event) => on an event handler
// request : all the data from the client
// response: all the data from us + we can attach dta to it + we can trigger a repsonse to start with this parameter
// response.send(<anything>) : takes the argument and sends it to the client
app.get('/', (request, response) => {
  response.send('you made it home, WOOHOO yay');
});

// localhost:3000/pet-the-pet?name=ginger&quantity=3&lastName=carignan
// expect a key value pair of name:ginger and quantity:3
// send 'petting ginger carignan petting ginger carignan petting ginger carignan'
// this lives with all the client data, in the `request (req)` parameter
// inside request will always live a property query: { name: 'ginger', quantity: '3', lastName: 'carignan' },

app.get('/pet-the-pet', (req, res) => {
  console.log(req.query.name);
  let str = '';
  for(let i = 0; i < req.query.quantity; i++) {
    str += `petting ${req.query.name} ${req.query.lastName} </br>`;
  }
  res.send(str);
});

// localhost:3000/baked-goods?pie=apple&muffin=blueberry&price=$13.12
app.get('/baked-goods', (req, res) => {
  const pieTheyWant = req.query.pie; //?pie=apple === apple
  const muffin = req.query.muffin; // === 'blueberry';
  const price = req.query.price; // === '$13.12';
  console.log(pieTheyWant, muffin, price);
  res.send(pieTheyWant + muffin + price);
});

// ========= Start the server ============
app.listen(PORT, () => console.log(`we are up on PORT ${PORT}`));



