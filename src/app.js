const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const app = express();

const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// define paths for express configuration
const PublicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and views directory path
app.set('views' , viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialPath)

//Setup  static directory to serve
app.use(express.static(PublicDir));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Welcome to weather',
        name: 'asif ali'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About this page',
        name: 'asif ali'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help guide',
        name: 'asif ali'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'asif ali',
        errorMessage:'help artical not found'
    })
})


app.get('/weather', (req, res) => {
        const addr = req.query.addr;
     if(!addr) {
         return res.send({
             error: 'Please enter address'
         })
     }

     else {
        
        geoCode( addr, (error, data ) => {
            if (error) {
                return res.send({error});
            }  
     
         forecast(data.lat,data.long, (error, forecastData) => {
             if(error) {
                 return res.send({error});
             }

               const result = {
                   location : data.location,
                   forecast : forecastData
               }

               res.send((result));
         })
     }) 


     } 
         

})





app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage:'page not found',
        name: 'asif ali'
    })
})


app.listen(3000, () => {
    console.log('listening on port 3000')
})