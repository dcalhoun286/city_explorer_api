'use strict';

// ========= packages ==============

const express = require('express');
const cors = require('cors');
require('dotenv').config(); // runs once and loads all the environment variables IF they were declared in a file instead of the terminal
const superagent = require('superagent');
const { response } = require('express');
// ===== setup the application (server) =====

const app = express(); // creates a server from the express library
app.use(cors()); // app.use loads middleware - we are loading cors so that requests don't get blocked when they are local

// ========== other global variables =========

const PORT = process.env.PORT || 3111; // all caps because it is a variable future devs should not touch

// ======= Routes ==========

// I need to add .catch functions to handle server errors at some point

app.get('/', (req, response) => {
  response.status(200).send('you made it home, WOOHOO yay');
});

/*
GET https://us1.locationiq.com/v1/search.php?key=YOUR_ACCESS_TOKEN&q=SEARCH_STRING&format=json
*/

app.get('/location', (req, res) => {
  // console.log(req.query.name);
  const cityUserEntered = req.query.city;

  if (cityUserEntered === '') {
    res.status(500).send('Error (invalid entry)! Please enter a city.');
  }
  const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}&q=${cityUserEntered}&format=json`;
  superagent.get(url).then(result => {
    // console.log(result.body[0]);
    const location = new Location(cityUserEntered, result.body[0].display_name, result.body[0].lat, result.body[0].lon);
    res.status(200).send(location);
  })
    .catch(error => {
      res.status(500).send('failed to retrieve location.');
      console.log(error.message);
    });
});

app.get('/weather', getWeather);

function getWeather(req, res) {
  // url = 'http://api.weatherbit.io/v2.0/forecast/daily
  // query string: lat, lon, days, key
  // console.log('weather query from front end', req.query);
  // console.log('weather path', req.url);

  const key = process.env.WEATHER_API_KEY;
  const longitude = req.query.longitude;
  const latitude = req.query.latitude;

  const url = `http://api.weatherbit.io/v2.0/forecast/daily/current?key=${key}&days=8&lon=${longitude}&lat=${latitude}`;
  superagent.get(url).then(result => {
    // console.log(result.body);
    //Documentation - Array.prototype.map: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    const arr = result.body.data.map(weatherObject => new Weather(weatherObject));
    res.status(200).send(arr);
  }).catch(error => {
    res.status(500).send('failed to get weather data');
    console.error('an error occured:', error);
  });
}

// National Parks
app.get('/parks', getParks);

function getParks(req, res) {
  const location = req.query.search_query;
  const parksKey = process.env.PARKS_API_KEY;
  const parksUrl = `https://developer.nps.gov/api/v1/parks?q=${location}&api_key=${parksKey}&limit=10`;

  superagent.get(parksUrl).then(parksResult => {
    // console.log('parks result', parksResult.body);
    const parkData = parksResult.body.data.map(parksObject => new Parks(parksObject));
    res.send(parkData);
  }).catch(error => {
    res.status(500).send('failed to get parks data');
    console.log(error.message);
  });
}
// ========= Helper Functions =========

function Weather(weatherObject) {
  this.forecast = weatherObject.weather.description,
  // formatting the date as directed by trello instructions
  // documentation: Nicco Ryan (TA) helped me with writing the code this way
  this.time = new Date(weatherObject.valid_date).toDateString();
}

function Location(search_query, formatted_query, latitude, longitude) {
  this.search_query = search_query;
  this.formatted_query = formatted_query;
  this.longitude = longitude;
  this.latitude = latitude;
}

function Parks(parksObject) {
  this.park_url = parksObject.url;
  this.name = parksObject.fullName;
  this.address = `${parksObject.addresses[0].line1} ${parksObject.addresses[0].city} ${parksObject.addresses[0].stateCode}, ${parksObject.addresses[0].postalCode}`;
  this.fee = parksObject.entranceFees[0].cost;
  this.description = parksObject.description;

  // console.log(`fees for ${parksObject.fullName}`, parksObject.entranceFees);
  // console.log(`addresses for ${parksObject.fullName}`, parksObject.addresses);
}

// ========= Start the server ============

app.listen(PORT, () => console.log(`we are up on PORT ${PORT}`));
