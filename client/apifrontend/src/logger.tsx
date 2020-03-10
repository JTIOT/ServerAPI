import * as logger from 'loglevel';

if(process.env.NODE_ENV !== 'production'){
    logger.setLevel('trace');
    console.log = logger.debug;
}
else{
    console.log = ()=>{};
}