const knex = require('knex')({
    client: 'mssql',
    debug: true,
    connection: {
      host : '192.168.5.185',
      user : 'sa',
      password : 'jit23236229',
      database : 'master'
    }
});


module.exports = {
    knex
}