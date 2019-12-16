const {knex} = require('../database');
const {ErrorMetaData} = require('../../exceptionHandler/exceptionHandler');
const {DB_ERROR} = require('../../exceptionHandler/databaseErrors/databaseErrorTypes');

/**
 * find user in DB
 * @param {*} userName 
 */
const findUser = async (userName) =>{

    const result = await knex.select('*')
    .from('BAL.dbo.CustomerInfo')
    .where({homeTel: userName});

    return result.length > 0? true : false;
}

/**
 * Create user data in DB
 * @param {*} schema  cusomterInfoSchema
 */
const registerUser = async (schema) => {

    knex.insert(schema).into('BAL.dbo.CustomerInfo')
    .then(result =>{
        return true;
    })
    .catch(err=>{
        console.log('DB ERROR', err);
        throw new ErrorMetaData(DB_ERROR);
    });
}

module.exports = {
    findUser,
    registerUser
}