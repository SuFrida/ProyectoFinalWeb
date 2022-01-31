const express = require('express');
const mongoose = require('mongoose')

const app = express()

//import routes
const indexRoutes = require('./routes/routeIndex')

app.set('port', process.env.PORT || 3000)
app.set('views', )

app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`)
})