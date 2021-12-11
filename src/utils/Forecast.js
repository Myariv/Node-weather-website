const request = require('request')


const forecast = (lat, long, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=200d4ea9e8a97984f047b345241ae5de&query=${lat},${long}`

    request({ url, json: true }, (err, { body } = {} ) => {
        const {current} = body
        const {location} = body
    
        
         if (err) {
            callback('Unable to Connect Weather Server', undefined) 
        } else if (body.error) {
            callback('Unable to find location', undefined) 
        } else {
            callback(undefined, ` the local time is: ${location.localtime}  it is currently ${current.temperature} degrees, it is feels like ${current.feelslike} out, the wind speed is ${current.wind_speed}`)
        }
    })
}

module.exports = forecast