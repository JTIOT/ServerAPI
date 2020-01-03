const {
    knex176,
    knex175
} = require('../database');
const {throwError} = require('../../exceptionHandler/exceptionHandler');
const {DB_ERROR} = require('../../exceptionHandler/errors/databaseErrors/databaseErrorTypes');

/**
 * convert mac to mac without ':'
 * @param {*} mac 
 * @return {*} formatted mac
 */
const formatMac = (mac) => {

    //convert mac to mac without ':'
    const macStr = mac.split("").filter((c)=>{ 
        return c != ":";
    }).join("");

    return macStr;
}

/**
 * Query find user in DB in 176
 * @param {*} userName 
 * @return {*} true if user exist otherwise false
 */
const userExist = async (userName) =>{

    const fn = async ()=>{
        const result = await knex176.select('*')
        .from('BAL.dbo.CustomerInfo')
        .where({homeTel: userName});

        return result.length > 0? true : false;
    }
    
    return queryHandler(fn);
}

/**
 * get user information
 * @param {*} condition is an object and will be used in sql where clause  
 * @return {*} an object with userId and email otherwise null
 */
const getUserInfoBy = async (condition) => {

    const fn = async ()=>{

        const result  = await knex176.select('*')
        .from('BAL.dbo.CustomerInfo')
        .where(condition);

        if(result.length > 0){
            const user = result[0];
            return {
                userId: user.balAccount,
                email: user.Email,
                userName: user.homeTel,
                password: user.password
            }
        }

        return null;
    }

    return queryHandler(fn);
}

/**
 * update user password 
 * @param {*} userId 
 * @param {*} newPassword
 * @return true update success otherwise false 
 */
const updateUserPassword = async (userId, newPassword) => {

    const fn = async ()=>{

        const result = await knex176.update({
            password: newPassword
        }, ['balAccount'])
        .from('BAL.dbo.CustomerInfo')
        .where({balAccount: userId});

        if(result.length > 0){
            return true;
        }

        return false;
    }

    return queryHandler(fn);
}

/**
 * Check if table of device is in db
 * @param {*} mac
 * @return {*} true if device table in db otherwise false 
 */
const deviceTableExist = async (mac) =>{

    const fn = async () =>{

        //convert mac to mac without ':'
        const macStr = formatMac(mac);
    
        const tableResult = await knex175.select('TABLE_NAME')
        .from('Bedplate2015.INFORMATION_SCHEMA.TABLES')
        .where({TABLE_NAME:macStr});
    
        return tableResult.length > 0? true : false;
    }

    return queryHandler(fn);
}

/**
 * Query create user data in DB in both 176 and 175
 * @param {*} schema  cusomterInfoSchema
 * @param {*} mac device's mac
 */
const registerUser = async (schema, mac) => {

    const fn = async () => {

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
            const pInfo = await trx175.insert({
                DeviceName:mac,
                Address: '',
                HeartStatus: '無法檢測',
                HeartrateMin: 40,
                IsOnBed: 0,
                HeartbeatUnusualObserveTime: 5,
                DeviceStatus: '0',
                DevOfflineTime: 30,
                SysNo: '20140813',
                AppNo: '20140813',
                HardwareNo: 'A0303',
                ClientIP: '60.248.43.175',
                SerialportOfflineFlag: 0,
                NetworkOfflineFlag: 0,
                UnusualAlarmFlag: 0,
                WeightAlarmTime: '',
                WeightAlarmInterval: 3,
                ReportOrNot: 0,
                DoorMac: '0',
                LastConnectionTimeStamp: '',
                LastRebootTime:'',
                LastUpdateTime:'',
                CreateDate: '',
                Similarity: 30,
                BCGModel: '1',
                Delay: 0,
                ReferenceHeartrate: 65,
                OnBedRange: 0,
                LeaveBedRange: 1023,
                OnBedObserveTime: 0,
                LeaveBedObserveTime: 0,
                BreathRate: 15,
                BreathDelay: 0,
                BreathOrNot: 0,
                StrictOrNot: 0,
                Noise: 0,
                usualOnBedTime: '0:00',
                usualLeaveBedTime: '6:00',
                usualOnBedValue: -1,
                usualLeaveBedValue: -1,
                UserAge: '33',
                BedplateUserName: '測試',
                SaveFileMaxDays: '30',
                SaveFileOrNot: '0',
                Disease:'',
                OnBedValueUpdateTime: '',
                LeaveBedValueUpdateTime: '',
                HBSensorAlarmTime: '',
                HBSensorAlarmInterval: 1,
                UserName: 'admin',
                IsAlwaysPullPlug: 0,
                HBFastAlarmTime: '',
                HBFastAlarmInterval: 1,
                HBSlowAlarmTime: '',
                HBSlowAlarmInterval: 1,
                BreathAlarmTime: '',
                BreathAlarmInterval: 1,
                NetworkFaultFlag: 0,
                MaxIncrement: -1,
                MaxIncrementTime: '',
                LeaveBedMinValue: -1,
                LatestLeaveValue: -1,
                LatestLeaveBeginTime: '',
                LatestLeaveEndTime: '',
                BedplateSensorFaultTime: '',
                LastSyncHBDataID: 0,
                LastSyncBRDataID: 0,
                LastSyncOnBedRecordID: 0,
                LastSyncSleepRecordID: 0,
                LastSyncWDataID: 0,
                SourceName: 0,
                DeviceToken: ''
            }).into('Bedplate2015.dbo.ProductInfo');
            console.log('pInfo', pInfo);
        }
    
        //convert mac to mac without ':'
        const macStr = formatMac(mac);
    
        //check if device mac table is existed in bedplate2015
        const tableExist = await deviceTableExist(macStr);
    
        //create table for device and use mac name for table name
        //if not exist in bedplate2015
        if(!tableExist){
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

    return queryHandler(fn);
}

/**
 * Query check if device mac is already in store/published in 176 BAL
 * @param {*} mac  device mac
 * @return {*} true if device is in store/published otherwsie false
 */
const deviceInStore = async (mac)=>{
    
    const fn = async () => {

        const result = await knex176.select('*')
        .from('BAL.dbo.DeviceInfo')
        .where({deviceMark: mac});

        return result.length > 0? true : false;
    }

    return queryHandler(fn);
}

/**
 * get device sample data from certin time point
 * @param {*} mac - device mac
 * @param {*} time - time point to start getting sample
 * @return {*} array of sample
 */
const deviceSample = async (mac, time)=>{

    const fn = async () => {

        const macStr = formatMac(mac);

        const result = await knex175.select('*')
        .from(`Bedplate2015.dbo.${macStr}`)
        .where('TimeStamp', '>=', time);

        return result;
    }

    return queryHandler(fn);
}

/**
 * Handle query's db error
 * Generalized db error
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
    updateUserPassword,
    deviceInStore,
    deviceSample,
    getUserInfoBy,
    deviceTableExist
}