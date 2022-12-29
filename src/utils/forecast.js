const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=ad2b0774f75f75888587ffbf3192ec19&query=${latitude},${longitude}&units=f`

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to forecast service');
    } else if (response.body.error) {
      callback('Unable to find forecast data for location');
    } else {
      callback(undefined, `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out.  It feels like ${response.body.current.feelslike} degrees out`)
    }
  })
}

module.exports = forecast;