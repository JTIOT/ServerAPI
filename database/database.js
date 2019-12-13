const sql = require('mssql');

const pool = new sql.ConnectionPool({
    user: 'sa',
    password: 'jit23236229',
    server: '192.168.5.185',
    database: 'master'
});

const poolConnect = pool.connect();
poolConnect.then(pool=>{
    console.log('Database connected', pool);
})
.catch(err=>{
    console.log('Can not connect database', err);
})

//database connection pool error handler
pool.on('error', err => {
    console.log('database error', err);
});

//TODO:handle database connection checking
const dbConnHandler = async (req, res, next)=>{
    const dbPool = await poolConnect;
    console.log('db pool', dbPool);
    if(dbPool){
        next();
    }
}

module.exports = {
    dbConnHandler
}