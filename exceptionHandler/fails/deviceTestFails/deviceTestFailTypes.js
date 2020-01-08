const {createFailType} = require('../../exceptionTypes');

const failTag = 'DeviceTest';
/**
 * define list of register fail types
 */
const deviceTestFailTypes = {
    DEVICE_NOT_EXIST: createFailType(failTag, 1000, 'Device table do not exist')
};

module.exports = deviceTestFailTypes;