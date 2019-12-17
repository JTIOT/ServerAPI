const {knex} = require('../database');
const {ErrorMetaData} = require('../../exceptionHandler/exceptionHandler');
const {DB_ERROR} = require('../../exceptionHandler/databaseErrors/databaseErrorTypes');

/**
 * Query find user in DB
 * @param {*} userName 
 */
const userExist = async (userName) =>{

    const result = await knex.select('*')
    .from('BAL.dbo.CustomerInfo')
    .where({homeTel: userName});

    return result.length > 0? true : false;
}

/**
 * Query create user data in DB
 * @param {*} schema  cusomterInfoSchema
 * @param {*} mac device's mac
 */
const registerUser = async (schema, mac) => {

    const trx = await knex.transaction();
    await trx.insert(schema).into('BAL.dbo.CustomerInfo');
    await trx.table('BAL.dbo.DeviceInfo').
    update({CustomerId: schema.insertYmd}).
    where({deviceMark:mac});
    await trx.commit();
    // await knex.insert(schema).into('BAL.dbo.CustomerInfo');
    // return true;
}

/**
 * Query check if device mac is already in store/published
 * @param {*} mac  device mac
 */
const deviceInStore = async (mac)=>{
    
    const result = await knex.select('*')
    .from('BAL.dbo.DeviceInfo')
    .where({deviceMark: mac});

    return result.length > 0? true : false;
}

/**
 * Handle query and internal db error
 * @param {*} fn function that need to be handled
 * @param  {...any} args arguements to be passed into function
 */
const queryHandler = async (fn, ...args)=>{

    try{
       return await fn(...args);
    }
    catch(err){
        console.log('DB error ', err);
        throw new ErrorMetaData(DB_ERROR);
    }
}

module.exports = {
    userExist,
    registerUser,
    deviceInStore,
    queryHandler
}