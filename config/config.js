const dbConfig = {
    client: 'mssql',
    debug: true,
    connection: {
      host : '192.168.5.185',
      user : 'sa',
      password : 'jit23236229',
      database : 'master'
    }
}

const jwtPrivateKey = 'This is private';

module.exports= {
    dbConfig,
    jwtPrivateKey
}