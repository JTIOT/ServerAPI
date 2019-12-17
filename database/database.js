const {dbConfig} = require('../config/config');

const knex = require('knex')(dbConfig);

module.exports = {
    knex
}