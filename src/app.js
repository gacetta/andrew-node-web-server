const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

// Define paths for Express config
const publicDir = path.resolve(__dirname, '../public')
const viewsPath = path.resolve(__dirname, '../templates/views')
const partialsPath = path.resolve(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Michael Gacetta'
  });
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Awesome Picture',
    name: 'Michael Gacetta'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Michael Gacetta',
    message: 'Help me find a good picture!'
  });
})

// Goal wire up /weather
// 1. require geocode/forecast into app.js X
// 2. use the address to geocode
// 3. use the coordinates to get forecast
// 4. send back the real forecast and location

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: 'You must provide an address'
    })
  }

  geocode(address, (error, { latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({
        error
      })
    }
  
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        })
      }
      res.send({
        forecast: forecastData,
        location,
        address
      })
    })
  })

  // res.send({
  //   forecast: 'Pretty shitty',
  //   location: 'Olympia',
  //   address
  // })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help/404',
    error: 'Help article not found',
    name: 'Michael Gacetta'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    error: 'Page not found',
    name: 'Michael Gacetta'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})



