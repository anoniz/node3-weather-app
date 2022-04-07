const request = require('request');


const forecast = (lat,long, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+ long +'&units=metric&appid=5ce5d3fa9d8831fedc48fe7e9bb546a8'
    
    request({url, json:true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to Weather API', undefined)
        } else if(body.message) {
            callback('Unable to find given coordinates', undefined)
        } else {
            callback(undefined, {
                temp: body.main.temp,
                feelLike: body.main.feels_like,                      
             
            })
        }
    })
}

module.exports = forecast;