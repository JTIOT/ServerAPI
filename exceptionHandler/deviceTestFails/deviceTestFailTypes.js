const {createFailType} = require('../exceptionTypes');

/**
 * define list of register fail types
 */
const deviceTestFailTypes = {
    DEVICE_NOT_EXIST: createFailType(2000, 'Device table do not exist')
};

module.exports = deviceTestFailTypes;