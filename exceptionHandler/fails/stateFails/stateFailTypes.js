const {createFailType} = require('../../exceptionTypes');

const failTag = 'State';
const stateFailTypes = {
    MAC_REQUIRE: createFailType(failTag, 1000, 'Device mac is required'),
    NO_DATA_ON_BED: createFailType(failTag, 1001, 'There is no data for onBed status'),
    NO_DATA_HEART_BEAT: createFailType(failTag, 1002, 'There is no data for heartbeat status'),
    NO_DATA_DEVICE_STATUS: createFailType(failTag, 1002, 'There is no data for heartbeat status')
};

module.exports = stateFailTypes;