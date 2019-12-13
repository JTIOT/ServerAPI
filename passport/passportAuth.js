const passport = require('passport');

const userAuth = (req, res, next)=>{

    //call passport authenticate. passport will use your strategy
    //we don't want passport to use session
    passport.authenticate('login', {session:false}, (err, user, info)=>{

        //if any error occured
        if(err){
            return res.status(400).json({...{status:'Fail'}, info});
        }

        //if user dose not exist
        if(!user){
            return res.status(400).json({...{status:'Fail'}, info});
        }

        //user exist and no error then log user in
        return res.status(200).json({...{status:'OK'}, info});


    })(req, res, next);
}

module.exports = {
    userAuth
}