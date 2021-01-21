'use strict';

// ========= packages ==============

const express = require('express');
const cors = require('cors');
require('dotenv').config(); // runs once and loads all the environment variables IF they were declared in a file instead of the terminal

// ===== setup the application (server) =====

const app = express(); // creates a server from the express library
app.use(cors()); // app.use loads middleware - we are loading cors so that requests don't get blocked when they are local

// ========== other global variables =========

const PORT = process.env.PORT || 3111; // all caps because it is a variable future devs should not touch

// ======= Routes ==========

// I need to add .catch functions to handle server errors at some point

app.get('/', (req, response) => {
  response.send('you made it home, WOOHOO yay');
});

app.get('/location', (req, res) => {
  console.log(req.query.name);
  const cityUserEntered = req.query.city;

  if (cityUserEntered === '') {
    res.send('Error (invalid entry)! Please enter a city.');
  }

  // superagent function will use the template literal ref GEOCODE_API_KEY from .env file; create a variable GEOCODE_API_KEY with key from .env file assigned to it. something about process.env

  // .then of superagent:
  // use the data that comes back in result.body (body is s proerpty of superagent)
  // will have same syntax as location.json

  /*

  what the front end receives needs to be an obj that looks like this

  {
    "<key>":"<value>"
  }

  */

  // remove line 50; replace with superagent
  const locationData = require('./data/location.json');
  const arr1 = [];
  locationData.forEach(city => {
    const newLocationObject = new Location(
      cityUserEntered,
      locationData[0].display_name,
      locationData[0].lat,
      locationData[0].lon
    );
    arr1.push(newLocationObject);
  });
  console.log(arr1[0]);
  res.send(arr1[0]);
});
// const cityData = new Location(
//   cityUserEntered,
//   dataFromLocationJSON[0].display_name,
//   dataFromLocationJSON[0].lat,
//   dataFromLocationJSON[0].lon
// );

//refactor code to reference WEATHER_API_KEY from .env file like the note I wrote on line 34
//array.prototype.map on weatherData arr
app.get('/weather', (req, res) => {
  const weatherData = require('./data/weather.json');
  const arr2 = [];
  weatherData.data.forEach(weatherObject => {
    const newWeatherObj = new Weather(weatherObject.weather.description, weatherObject.valid_date);
    arr2.push(newWeatherObj);
  });
  console.log(arr2);
  res.send(arr2);
});

// app.get('/weather', (req, res) => {
//   console.log(req.query.name);
//   const dataFromWeatherJSON = require('./data/weather.json');
//   const weatherArray = [];
//   // const weatherArray = new Weather
//   dataFromWeatherJSON.data.forEach(object => {
//     weatherArray.push(
//       new Weather(
//         object.weather.description,
//         object.valid_date
//       )
//     );
//   });
//   console.log(weatherArray);
//   res.send(weatherArray);
// });

// ========= Helper Functions =========

function Weather(forecast, time) {
  this.forecast = forecast,
  this.time = time;
}

function Location(search_query, formatted_query, latitude, longitude) {
  this.search_query = search_query;
  this.formatted_query = formatted_query;
  this.longitude = longitude;
  this.latitude = latitude;
}

// ========= Start the server ============

app.listen(PORT, () => console.log(`we are up on PORT ${PORT}`));
