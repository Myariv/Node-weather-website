const request = require('request')


const gecode = (adress, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${adress}.json?access_token=pk.eyJ1IjoibXlhcml2IiwiYSI6ImNrd3RocG80MTFnOTEyd3VzZW9kd3YxM3AifQ.vJqU8vnQt_Y7N0P3ARIaHA&limit=1`

    request({ url, json: true }, (err, {body: {features} } = {}) => {
        
        if (err) {
            callback('Unable to Connect to Geolocation Server', undefined)
        } else if (!features.length) {
            callback('Unable To Find The Location Coding, please Try Agein', undefined)
        } else {
            callback(undefined, {
                latitue: features[0].center[1],
                longtitude: features[0].center[0],
                placeName: features[0].place_name
            })
        }

    })

}


module.exports = gecode