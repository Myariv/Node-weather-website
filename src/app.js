// core modules -----------
const path = require('path')

// regular modules ---------
const express = require('express')
const hbs = require('hbs')


// require methods 
const Forcast = require('./utils/Forecast')
const Gecode = require('./utils/Gecode')


//launch express
const app = express()

const port = process.env.PORT || 3000


// set Paths dir 
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')




// setUp handelbars engine and views location  
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



// launch static pages (css/img/html)
app.use(express.static(publicDirPath))





// launch dynamic pages with view engine --------- 

app.get('/', (req, res) => {
    res.render('index', { title: 'Weather', name: 'Yariv Malca' })
})


app.get('/about', (req, res) => {
    res.render('about', { name: 'Yariv Malca', title: 'About' })
})


app.get('/help', (req, res) => {
    res.render('help', { message: 'What We Can Help For', title: 'Help', name: 'Yariv Malca' })
})

app.get('/help/*', (req, res) => {
    res.render('404', { errorMessage: 'Help Article Is Not Found', title: '404', name: 'Yariv Malca', css: publicDirPath })
})



app.get('/weather', (req, res) => {

    if (!req.query.adress) {
        return res.send({ error: 'You Must Name Adrees' })
    }


    // in case there is no adress or adress is not valid we make the variables undefined then it will return undefind! and no crush the functuion
    Gecode(req.query.adress, (err, { latitue, longtitude, placeName } = {}) => {

        if (err) {
            return res.send({ err })
        }

        Forcast(latitue, longtitude, (err, forcast) => {

            if (err) {
                return res.send({ err })
            }

            res.send({ forcast, location: placeName })
        })
    })
})


app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({ error: 'You Must Search Somthing' })
    }

    res.send({ products: [] })
})


app.get('*', (req, res) => {
    res.render('404', { errorMessage: 'Page Not Found', title: '404', name: 'Yariv Malca' })
})




app.listen(port, () => {
    console.log(`server is on port ${port}`);
})