# city_explorer_api

**Author**: Dar-Ci Calhoun
**Version**: 5.0.0

## Overview

**Problem Domain**: Create an app that allows a user to look up a location and view the following features:

- Location
- Weather forecast for next few days
- geographical coordinates (latitude, longitude)

## Getting Started

In order to run this app on your machine, complete the following steps:

1. Clone this GitHub repository to your local machine and `cd` into that directory(need to have git and Node installed before beginning this step)
2. Run a `npm init` command in your terminal, followed by `npm install -S cors express dotenv superagent` to add the environments you will need
3. Run a `touch .env` command to add a file where secure data will be stored
  1. add your PORT key in your .env file with the following format: `PORT=<PORTNUMBER>`. This should be a 4-digit number

## Architecture

**Languages, Technologies, and Libraries Used**:

- JavaScript
- Node
- Express
- Cors
- .json
- Heroku

## Change Log

01-20-2021 5:45pm - Application now has a functional express server
01-20-2021 6:00pm - Application is now deployed to Heroku
01-24-2021 4:43pm - Application now retrieves data using geocode, parks, and weather API keys
01-30-2021 8:15pm - Application now has proper error handling
01-30-2021 11:25pm - Database setup complete, server now begins after database connection is established
01-31-2021 9:30pm - Application now retrieves data using TheMovieDB API key

## Time Estimates

**Number and name of feature**: 1. Configuration

- **Estimate of time needed to complete**: 5 hours
- **Start time**: 01-18-2021 1:30pm
- **Finish time**: 01-20-2021 5:45pm
- **Actual time needed to complete**: approx. 12 hours total

**Number and name of feature**: 2. Data formatting

- **Estimate of time needed to complete**: 1 hour
- **Start time**: 01-20-2021 9:30pm
- **Finish time**: 01-21-2021 7:30pm
- **Actual time needed to complete**: approx. 90 minutes total

**Number and name of feature**: 3. Locations

- **Estimate of time needed to complete**: 15 minutes
- **Start time**: 01-21-2021 7:00pm
- **Finish time**: 01-21-2021 7:10pm
- **Actual time needed to complete**: 10 minutes

**Number and name of feature**: 4. Weather

- **Estimate of time needed to complete**: 10 minutes
- **Start time**: 01-21-2021 7:10pm
- **Finish time**: 01-21-2021 7:30pm
- **Actual time needed to complete**: 20 minutes

**Number and name of feature**: 5. Trails

- **Estimate of time needed to complete**: 60 minutes
- **Start time**: 01-24-2021 12:42pm
  - stop 01-24-2021 2:17pm
  - resume 01-24-2021 3:55pm
- **Finish time**: 01-24-2021 4:30pm
- **Actual time needed to complete**: 99 minutes

**Number and name of feature**: 6. Database Setup and Creation

- **Estimate of time needed to complete**: 60 minutes
- **Start time**: 01-30-2021 9:30pm
- **Finish time**: 01-30-2021 11:25pm
- **Actual time needed to complete**: 115 minutes

**Number and name of feature**: 7. Database-Server: check database for stored locations before performing a search query

- **Estimate of time needed to complete**: 15 minutes
- **Start time**: 01-30-2021 10:15pm
- **End time**: 01-30-2021 10:35pm
- **Actual time needed to complete**: 20 minutes

**Number and name of feature**: 8. Database-Deploy: deployment to Heroku

- **Estimate of time needed to complete**: 20 minutes
- **Start time**: 01-30-2021 11:55pm
  - stop: 01-31-2021 12:21am
  - resume: 01-31-2021
- **End time**:
- **Actual time needed to complete**:

**Number and name of feature**: 9. Movies

- **Estimate of time needed to complete**: 90 minutes
- **Start time**: 01-31-2021 2:15pm
  - stop: 01-31-2021 4:20pm
  - resume: 01-31-2021 8:00pm
- **End time**: 01-31-2021 9:30pm
- **Actual time needed to complete**: 215 minutes

## Credits and Collaborations

**The people listed below deserve a shoutout for the help they gave me as I completed this project!**

- [Carly Dekock](https://github.com/carlydekock)
- [Stephen Webber](https://github.com/offgridauthor)
- [Sara Russert](https://github.com/sarabeth-russert)(TA)
- [Nicholas Carignan](https://github.com/ncarignan)(instructor)
- [Jason Dormier](https://github.com/JasonDormier)
- [Nicco Ryan](https://github.com/Niccoryan0)(TA)
- [GitHub Class Repository for This Assignment](https://github.com/codefellows/seattle-301d70/tree/main/class-06/demos/server2)
- [MDN Web Docs: Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
