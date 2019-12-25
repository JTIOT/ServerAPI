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

const mailConfig = {
  pool: true,
  host: "192.168.5.185",
  port: 25,
  secure: false, // use TLS
  auth: {
    user: "test@192.168.5.185",
    pass: "23236229"
  }
}

module.exports= {
    dbConfig176,
    dbConfig175,
    jwtPrivateKey,
    mailConfig
}