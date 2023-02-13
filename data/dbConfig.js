
const configurations = require('../knexfile.js');
const environment = process.env.NODE_ENV || 'development';


const knex = require('knex')(configurations[environment]);

module.exports = knex; 
    