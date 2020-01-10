const bcrypt = require('bcryptjs');

/**
 * hash plain text password
 * @param {*} password in plain text
 * @param {*} saltRound salt round default is 10
 * @return hashed password or thorw error 
 */
const hashPassword = async (password, saltRound=10)=>{

    try{

        const hashedPassword = await bcrypt.hash(password, saltRound);
        return hashedPassword;
    }
    catch(err){
        console.log('hashing password error ', err);
        throw err;
    }
}

/**
 * 
 * @param {*} password in plain text
 * @param {*} hashedPassword  password to be compared in hash
 * @return true if password valid otherwise false. throw error if error occured
 */
const validatePassword = async (password, hashedPassword) => {

    try{

        const valid = await bcrypt.compare(password, hashedPassword);
        return valid;
    }
    catch(err){
        console.log('validating password error ', err);
        throw err;
    }
}

module.exports = {
    hashPassword,
    validatePassword
}