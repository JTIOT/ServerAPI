const passport = require('passport');
const localStrategy = require('passport-local');

passport.use('login', new localStrategy({

    usernameField: 'username',
    passwordField: 'password'
  },

  (username, password, done)=>{

    //TODO: check if username exist in DB
    let userExist = true;

    //user exist
    if(userExist){
        return done(null, userExist, {
            message:'Login succssful'
        });
    }
    else{//user does not exist
        return done(null, false, {
            message:'user not found'
        });
    }
}));

module.exports = passport;