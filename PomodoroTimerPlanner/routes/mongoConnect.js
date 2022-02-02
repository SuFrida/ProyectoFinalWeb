const mongoose = require('mongoose')
const mongodb_uri = require('./../configuration/credentials')

mongoose.connect(mongodb_uri.mongoCredentials.mongolink, {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
    if (err) throw (err)
    console.log("Successfully connected to Mongo DB");
});