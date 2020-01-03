/**
 * initial schema for DB
 */
const cusomterInfoSchema = {
    keyId: '',
    balAccount: '',
    name: '', 
    gender: 0, 
    age: 0, 
    homeAddress: '', 
    homeTel: '', 
    idNum: '',
    Email: '', 
    insertYmd: '', 
    insertId: '', 
    updateYmd: '', 
    updateId: '',
    customerStatus: 0,
    openTime: '',
    regionFlag: -1,
    port: 2,
    countryCode: 'TW'
}

module.exports = {
    cusomterInfoSchema
}