const dbConfig176 = {
    client: 'mssql',
    debug: true,
    connection: {
      host : '60.248.43.176',
      user : 'sa',
      password : '62C50298',
      database : 'master'
    }
}

const dbConfig175 = {
  client: 'mssql',
  debug: true,
  connection: {
    host : '60.248.43.175',
    user : 'sa',
    password : 'jtiot!@#1208',
    database : 'master'
  }
}

const jwtPrivateKey = 'This is private';

module.exports= {
    dbConfig176,
    dbConfig175,
    jwtPrivateKey
}