const express = require('express');
const bodyParser = require('body-parser');
const { JSend } = require('jsend-express')
const {
    ErrorMetaData,
    FailMetaData, 
    ExceptionHandler} = require('./exceptionHandler/exceptionHandler');
const testErrorTypes = require('./exceptionHandler/testErrors/testErrorTypes');
const testFailTypes = require('./exceptionHandler/testFails/testFailTypes');
const asyncHandler = require('express-async-handler'); 

const userRoute = require('./routes/userRoute');

const port = process.env.PORT || 3100;
const jSend = new JSend({ name: 'serverApp', version: '0.0.1', release: '01' });

const app = express();

app.use(jSend.middleware.bind(jSend));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', asyncHandler(async (req, res)=>{
    res.send('Server is working');
}));

//test Error handling
app.get('/testError', asyncHandler(async (req, res, next)=>{

    throw new ErrorMetaData(testErrorTypes.GENERAL_ERROR);
}));

//test fail handling
app.get('/testFail', asyncHandler(async (req, res, next)=>{
    throw new FailMetaData(testFailTypes.FATAL_FAIL);
}));

//user route
app.use('/user', userRoute);

app.use(ExceptionHandler);

app.listen(port, (error)=>{
    if(error){
        console.log('Error while starting server ', error);
        return;
    }
    console.log(`Server started at port ${port} !!!`);
});