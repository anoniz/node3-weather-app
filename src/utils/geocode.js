const request = require('request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + ' .json?access_token=pk.eyJ1IjoiYW5vbjEyM2Fub24iLCJhIjoiY2wwMjlnb3JsMTF0MDNscWMzaDI5NnJubSJ9.JT1E4iSN8zfh7ClGP2qYtQ&limit=1'
    
    request({url, json: true}, (error, {body}= {}) => {
        if(error) {
            callback('Unable to connect to geoCode service', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find Location', undefined)
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}


module.exports = geoCode;