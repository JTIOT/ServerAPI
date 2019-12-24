const {
    knex176,
    knex175
} = require('../database');
const {throwError} = require('../../exceptionHandler/exceptionHandler');
const {DB_ERROR} = require('../../exceptionHandler/databaseErrors/databaseErrorTypes');

/**
 * Query find user in DB in 176
 * @param {*} userName 
 * @param (*) return true if user exist otherwise false
 */
const userExist = async (userName) =>{

    const result = await knex176.select('*')
    .from('BAL.dbo.CustomerInfo')
    .where({homeTel: userName});

    return result.length > 0? true : false;
}

/**
 * Query create user data in DB in both 176 and 175
 * @param {*} schema  cusomterInfoSchema
 * @param {*} mac device's mac
 */
const registerUser = async (schema, mac) => {

    ////////////////BAL 176////////////////////
    const trx176 = await knex176.transaction();

    //insert an user data to BAL
    await trx176.insert(schema).into('BAL.dbo.CustomerInfo');

    //binding user to device in BAL
    await trx176.table('BAL.dbo.DeviceInfo').
    update({CustomerId: schema.insertYmd}).
    where({deviceMark:mac});

    
    ////////////////bedplate2015 175////////////////////
    const trx175 = await knex175.transaction();

    //check if device in bedplate2015
    const result = await trx175.select('*')
    .from('Bedplate2015.dbo.ProductInfo')
    .where({DeviceName: mac});

    //if no device information in bedplate2015 insert a new one
    //otherwise leave it be
    if(result.length <= 0)
    {
        console.log('insert to bedplate');
        await trx175.insert({DeviceName:mac}).into('Bedplate2015.dbo.ProductInfo');
    }

    //convert mac to mac without ':'
    const macStr = mac.split("").filter((c)=>{ 
        return c != ":";
    }).join("");

    //check if device mac table is existed in bedplate2015
    const tableResult = await trx175.select('TABLE_NAME')
    .from('Bedplate2015.INFORMATION_SCHEMA.TABLES ')
    .where({TABLE_NAME:macStr});

    //create table for device and use mac name for table name
    //if not exist in bedplate2015
    if(tableResult.length <= 0){
        console.log(`table ${macStr} does not exist create one`);

        await trx175.schema.withSchema('Bedplate2015.dbo').createTable(macStr, table=>{
            table.increments('ID').primary().notNullable();
            table.integer('HeartbeatRate').notNullable();
            table.integer('BreathingRate').nullable();
            table.integer('PressureValue').nullable();
            table.integer('FileIndex').nullable();
            table.integer('SleepActivity').nullable();
            table.dateTime('TimeStamp').nullable();
            table.dateTime('ReceiveTime').nullable();
            table.integer('HBReliability').nullable();
        })
    }

    await trx176.commit();
    await trx175.commit();
}

/**
 * Query check if device mac is already in store/published in 176 BAL
 * @param {*} mac  device mac
 * @param {*} return true if device is in store/published otherwsie false
 */
const deviceInStore = async (mac)=>{
    
    const result = await knex176.select('*')
    .from('BAL.dbo.DeviceInfo')
    .where({deviceMark: mac});

    return result.length > 0? true : false;
}

/**
 * Handle query's db error
 * @param {*} fn query function that need to be handled
 * @param  {...any} args arguements to be passed into function
 */
const queryHandler = async (fn, ...args)=>{

    try{
       return await fn(...args);
    }
    catch(err){
        console.log('DB error ', err);
        throwError(DB_ERROR);
    }
}

module.exports = {
    userExist,
    registerUser,
    deviceInStore,
    queryHandler
}