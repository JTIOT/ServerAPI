const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3100;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.send('Server is working');
})

app.listen(port, (error)=>{
    if(error){
        console.log('Error while starting server ', error);
        return;
    }
    console.log(`Server started at port ${port} !!!`);
});