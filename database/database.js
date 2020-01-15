const {
    dbConfig
} = require('../config/config');

const knex = require('knex')(dbConfig);

const knex175 = require('knex')({
    client: 'mssql',
    debug: true,
    connection: {
      host : '60.248.43.175',
      user : 'sa',
      password : 'jtiot!@#1208',
      database : 'master'
    }
});

const knex176 = require('knex')({
    client: 'mssql',
    debug: true,
    connection: {
      host : '60.248.43.176',
      user : 'sa',
      password : '62C50298',
      database : 'master'
    }
});

module.exports = {
    knex,
    knex175,
    knex176
}