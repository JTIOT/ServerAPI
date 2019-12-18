const {knex} = require('../database');
const {throwError} = require('../../exceptionHandler/exceptionHandler');
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

    //insert an user data
    await trx.insert(schema).into('BAL.dbo.CustomerInfo');

    //binding user to device
    await trx.table('BAL.dbo.DeviceInfo').
    update({CustomerId: schema.insertYmd}).
    where({deviceMark:mac});

    //check if device in bedplate2015
    const result = await trx.select('*')
    .from('Bedplate2015.dbo.ProductInfo')
    .where({DeviceName: mac});

    //no device in bedplate2015 insert a new one
    //otherwise leave it be
    if(result.length <= 0)
    {
        console.log('insert to bedplate');
        await trx.insert({DeviceName:mac}).into('Bedplate2015.dbo.ProductInfo');
    }

    //convert mac to mac without :
    const macStr = mac.split("").filter((c)=>{ 
        return c != ":";
    }).join("");

    //check if device mac table is existed in db
    const tableResult = await trx.select('TABLE_NAME')
    .from('Bedplate2015.INFORMATION_SCHEMA.TABLES ')
    .where({TABLE_NAME:macStr});

    //create one if not exist
    if(tableResult.length <= 0){
        console.log(`table ${macStr} does not exist create one`);

        await trx.schema.withSchema('Bedplate2015.dbo').createTable(macStr, table=>{
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