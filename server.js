'use strict';

// ========= packages ==============

const express = require('express');
const cors = require('cors');
require('dotenv').config(); // runs once and loads all the environment variables IF they were declared in a file instead of the terminal
const superagent = require('superagent');
const { response } = require('express');
const pg = require('pg');

// ===== setup the application (server) =====

const app = express(); // creates a server from the express library
app.use(cors()); // app.use loads middleware - we are loading cors so that requests don't get blocked when they are local

const DATABASE_URL = process.env.DATABASE_URL;
const client = new pg.Client(DATABASE_URL);

// ========== other global variables =========

const PORT = process.env.PORT || 3111;

// ======= Routes ==========

app.get('/', (req, response) => {
  response.status(200).send('you made it home, WOOHOO yay');
});

app.get('/location', getLocation);

function getLocation(req, res) {
  const cityUserEntered = req.query.city;
  console.log('city user entered', cityUserEntered);
  const key = process.env.GEOCODE_API_KEY;

  // checking to see if the city that the user entered is already in the database
  const sqlQuery = 'SELECT * FROM city WHERE search_query=$1';
  const sqlArray = [cityUserEntered];
  client.query(sqlQuery, sqlArray).then(result => {

    // console.log(result.rows);

    if (result.rows.length !== 0) {
      response.send(result.rows[0]);
    } else {
      if (cityUserEntered === '') {
        res.status(500).send('Error (invalid entry)! Please enter a city.');
        return;
      }

      const url = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${cityUserEntered}&format=json`;

      superagent.get(url).then(result => {
        const cityObject = result.body[0];
        // console.log(cityObject);
        const newCity = new Location(cityUserEntered, cityObject);

        // enter new city that user entered into database
        const sqlQuery = 'INSERT INTO city (search_query, formatted_query, latitude, longitude) VALUES($1, $2, $3, $4)';
        const sqlArray = [newCity.search_query, newCity.formatted_query, newCity.latitude, newCity.longitude];
        // console.log('sql array', sqlArray);
        client.query(sqlQuery, sqlArray);
        res.send(newCity);
      })
        .catch(error => {
          res.status(500).send('failed to retrieve location.');
          console.log('failed to retrieve location', error.message);
        });

    }
  });

}

app.get('/weather', getWeather);

function getWeather(req, res) {

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
    console.error('failed to get weather data', error);
  });
}

// National Parks
app.get('/parks', getParks);

function getParks(req, res) {
  const cityUserEntered = req.query.search_query;
  const parksKey = process.env.PARKS_API_KEY;
  const parksUrl = `https://developer.nps.gov/api/v1/parks?q=${cityUserEntered}&limit=10&api_key=${parksKey}`;

  superagent.get(parksUrl).then(parksResult => {
    // console.log('parks result', parksResult.body);
    const parkData = parksResult.body.data.map(parksObject => new Parks(parksObject));
    res.send(parkData);
  }).catch(error => {
    res.status(500).send('failed to get parks data');
    console.log('failed to get parks data', error.message);
  });
}

// movies

app.get('/movies', getMovies);

function getMovies(req, res) {

  const city = req.query.search_query;
  const movieKey = process.env.MOVIE_API_KEY;

  // https://developers.themoviedb.org/3/search/search-movies

  const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&language=en-US&query=${city}&total_results=10`;

  superagent.get(movieUrl).then(result => {

    const moviesArray = result.body.results.map(movieObject => new Movies(movieObject));
    res.send(moviesArray);
  })
    .catch(error => {
      res.status(500).send('failed to retrieve movies.');
      console.log(error);
    });
}

// ========= Helper Functions =========

function Weather(weatherObject) {
  this.forecast = weatherObject.weather.description,
  // formatting the date as directed by trello instructions
  // documentation: Nicco Ryan (TA) helped me with writing the code this way
  this.time = new Date(weatherObject.valid_date).toDateString();
}

function Location(city, object) {
  this.search_query = city;
  // console.log(city);
  // this.formatted_query = object.formatted_query;
  this.formatted_query = object.display_name;
  this.latitude = object.lat;
  this.longitude = object.lon;
}

function Parks(object) {
  this.name = object.fullName;
  this.address = `${object.addresses[0].line1} ${object.addresses[0].city} ${object.addresses[0].stateCode}, ${object.addresses[0].postalCode}`;
  this.fee = object.entranceFees[0].cost? object.entranceFees[0] : 'free';
  this.description = object.description;
  this.park_url = object.url;
}

function Movies(object) {
  this.title = object.title;
  this.overview = object.overview;
  this.average_votes = object.vote_average;
  this.total_votes = object.vote_count;
  this.image_url = `https://image.tmdb.org/t/p/w500${object.poster_path}`;
  this.popularity = object.popularity;
  this.released_on = object.release_date;
}

// ========= Start the server ============

// database connecting to server
client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`we are up on PORT ${PORT}`));
  })
  .catch(error => {
    console.log('server failed to load', error.message);
  });
