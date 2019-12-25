
const {
    queryHandler,
    deviceSample,
    deviceTableExist
} = require('../database/queryUtil/queryUtil');

const {throwFail} = require('../exceptionHandler/exceptionHandler');

const {
    DEVICE_NOT_EXIST
}  = require('../exceptionHandler/deviceTestFails/deviceTestFailTypes');

const moment = require('moment');

/**
 * filter sample 
 * @param {*} samples 
 */
const sampleFilter = (samples) => {

    return samples.filter((sample)=>{
        //filter out hearbeat rate greater than and equal to 3000
        return sample.HeartbeatRate < 3000;
    })
}

/**
 * test device is setup correctly
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const deviceTest = async (req, res, next) => {

    const {mac} = req.body;

    const tableExist = await deviceTableExist(mac);

    if(!tableExist){
        throwFail(DEVICE_NOT_EXIST);
    }
    
    //retrieve samples within last time in seconds
    const samplingFromLastSec = 5;

    //create sampling time point
    const samplingTimePoint = moment()
    .subtract(samplingFromLastSec, 'seconds')
    .format('YYYY-MM-DD HH:mm:ss');

    console.log('get sample from time point ', samplingTimePoint);
    const result = await deviceSample(mac, samplingTimePoint);

    //filter sample
    const filtedResult = sampleFilter(result);

    let data = {pass:false};

    //pass test at least one sample exist
    if(filtedResult.length > 0){

        data = {...data, pass:true};
        return res.success({data});
    }
    
    res.success({data});
}

module.exports = deviceTest;