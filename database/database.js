const {
    dbConfig176, 
    dbConfig175
} = require('../config/config');

const knex176 = require('knex')(dbConfig176);
const knex175 = require('knex')(dbConfig175);

module.exports = {
    knex176,
    knex175
}