const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=ad2b0774f75f75888587ffbf3192ec19&query=${latitude},${longitude}&units=f`

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to forecast service');
    } else if (response.body.error) {
      callback('Unable to find forecast data for location');
    } else {
      const curr = response.body.current;
      callback(undefined, `${curr.weather_descriptions[0]}. It is currently ${curr.temperature} degrees out with ${curr.humidity}% humidity (feels like ${curr.feelslike} degrees).  There is ${curr.cloudcover}% cloud cover and visibility is ${curr.visibility} mi.`)
    }
  })
}

module.exports = forecast;