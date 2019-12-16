const {createErrorType} = require('../exceptionTypes');

const databaseErrorTypes = {
    DB_ERROR: createErrorType('Database error')
};

module.exports = databaseErrorTypes;