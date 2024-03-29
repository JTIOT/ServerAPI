const {
    knex
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
const userExist = (userName) =>{

    const fn = async ()=>{
        const result = await knex.select('*')
        .from('BAL.dbo.CustomerInfo')
        .where({homeTel: userName});

        return result.length > 0? true : false;
    }
    
    return queryHandler(fn);
}

/**
 * get user information
 * @param {*} condition is an object and will be used in sql where clause  
 * @return {*} an object with userId, email userName and password otherwise null
 */
const getUserInfoBy = (condition) => {

    const fn = async ()=>{

        const result  = await knex.select('*')
        .from('BAL.dbo.CustomerInfo')
        .where(condition);

        if(result.length > 0){
            const user = result[0];
            return {
                keyId: user.keyId,
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
 * get device mac
 * @param {*} keyId user keyId in CustomerInfo table 
 * @return device mac in string
 */
const getDeviceMacByUserKeyId = (keyId) => {

    const fn = async ()=>{

        const result = await knex.select('*')
        .from('BAL.dbo.DeviceInfo')
        .where({customerId: keyId})

        if(result.length > 0){
            const deviceInfo = result[0];
            return deviceInfo.deviceMark;
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
const updateUserPassword = (userId, newPassword) => {

    const fn = async ()=>{

        const result = await knex.update({
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
const deviceTableExist = (mac) =>{

    const fn = async () =>{

        //convert mac to mac without ':'
        const macStr = formatMac(mac);
    
        const tableResult = await knex.select('TABLE_NAME')
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
const registerUser = (schema, mac) => {

    const fn = async () => {

        //get transaction instance
        const trx = await knex.transaction();
    
        //insert an user data to BAL
        await trx.insert(schema)
        .into('BAL.dbo.CustomerInfo');
    
        //binding user to device in BAL
        await trx.table('BAL.dbo.DeviceInfo').
        update({CustomerId: schema.insertYmd}).
        where({deviceMark:mac});
    
        //check if device in bedplate2015
        const result = await trx.select('*')
        .from('Bedplate2015.dbo.ProductInfo')
        .where({DeviceName: mac});
    
        //if no device information in bedplate2015 insert a new one
        //otherwise leave it be
        if(result.length <= 0)
        {
            console.log('insert to bedplate');
            await trx.insert({
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
            })
            .into('Bedplate2015.dbo.ProductInfo');

            //update inserted data id into customer info in BAL
            const insertedResult = await trx.select('ID')
            .from('Bedplate2015.dbo.ProductInfo')
            .where({DeviceName: mac});

            if(insertedResult.length > 0){
                console.log('insertedResult ', insertedResult);
                const insertedId = insertedResult[0].ID;

                await trx.update({ID: insertedId})
                .from('BAL.dbo.CustomerInfo')
                .where({balAccount: schema.balAccount})
            }
        }
    
        //convert mac to mac without ':'
        const macStr = formatMac(mac);
    
        //check if device mac table is existed in bedplate2015
        const tableExist = await deviceTableExist(macStr);
    
        //create table for device and use mac name for table name
        //if not exist in bedplate2015
        if(!tableExist){
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
    }

    return queryHandler(fn);
}

/**
 * Query check if device mac is already in store/published in 176 BAL
 * @param {*} mac  device mac
 * @return {*} true if device is in store/published otherwsie false
 */
const deviceInStore = (mac)=>{
    
    const fn = async () => {

        const result = await knex.select('*')
        .from('BAL.dbo.DeviceInfo')
        .where({deviceMark: mac});

        const device = result[0];
        console.log('device', device);
        return device && device.deviceStatusMark === '1'? true : false;
    }

    return queryHandler(fn);
}

/**
 * get device sample data from certin time point
 * @param {*} mac - device mac
 * @param {*} time - time point to start getting sample
 * @return {*} array of sample
 */
const deviceSample = (mac, time)=>{

    const fn = async () => {

        const macStr = formatMac(mac);

        const result = await knex.select('*')
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
    getDeviceMacByUserKeyId,
    deviceTableExist
}