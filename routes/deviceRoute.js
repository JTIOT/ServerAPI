const express = require('express');
const router = express.Router();

const {
    getIsOnBed,
    getHeartbeatRate,
    getDeviceStatus
} = require('../database/queryUtil/queryUtil');

const {
    MAC_REQUIRE,
    NO_DATA_ON_BED,
    NO_DATA_HEART_BEAT,
    NO_DATA_DEVICE_STATUS
} = require('../exceptionHandler/fails/stateFails/stateFailTypes');

const {throwFail} = require('../exceptionHandler/exceptionHandler');

const asyncHandler = require('express-async-handler'); 

router.post('/getState', asyncHandler(async (req, res, next) => {

    const {mac} = req.body;

    if(!mac){
        throwFail(MAC_REQUIRE);
    }

    const onBedResult = await getIsOnBed(mac);
    const heartbeatResult = await getHeartbeatRate(mac);
    const deviceStatusResult = await getDeviceStatus(mac);

    console.log('result ', onBedResult, heartbeatResult, deviceStatusResult);

    if(!onBedResult){
        throwFail(NO_DATA_ON_BED);
    }

    if(!heartbeatResult){
        throwFail(NO_DATA_HEART_BEAT);
    }

    if(!deviceStatusResult){
        throwFail(NO_DATA_DEVICE_STATUS);
    }

    const onBed = onBedResult.IsOnBed;
    const heartbeatRate = heartbeatResult.HeartbeatRate;
    const deviceStatus = deviceStatusResult.DeviceStatus;

    const data = {
        onBed,
        heartbeatRate,
        deviceStatus
    }

    res.success({data});
}));

module.exports = router;