const express = require('express');
const bodyParser = require('body-parser');
const { JSend } = require('jsend-express')
const {ExceptionHandler} = require('./exceptionHandler/exceptionHandler');
const asyncHandler = require('express-async-handler');

const testRoute = require('./routes/testRoute');
const userRoute = require('./routes/userRoute');

//server port
const port = process.env.PORT || 3100;

//init jSend
const jSend = new JSend({ name: 'serverApp', version: '0.0.1', release: '01' });

//init express
const app = express();

//jSend response middle ware
app.use(jSend.middleware.bind(jSend));

//body parser middle ware
app.use(bodyParser.urlencoded({ extended: false }));

//use body parser to parse json
app.use(bodyParser.json());


//main route
app.get('/', asyncHandler(async (req, res)=>{
    res.send('Server is working');
}));

//test route
app.use('/test', testRoute);

//user route
app.use('/user', userRoute);

//exception handler
app.use(ExceptionHandler);

const server = app.listen(port, (error)=>{
    if(error){
        console.log('Error while starting server ', error);
        return;
    }
    const address = server.address().address;
    const sPort = server.address().port;
    console.log(`Server started at ${address} port ${sPort} !!!`);
});