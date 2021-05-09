//database imports
const { response } = require('express');
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://oxaisvfvutighn:98744731fe1728518ec9fc609c81e5be2fadcfe841b0849c86ad29848ba4aa45@ec2-3-217-219-146.compute-1.amazonaws.com:5432/d774e14havp4nu',
    ssl: {
        rejectUnauthorized: false
    }
});

const getAllBackscratchers = () => pool.query('select * from backscratchers')
    .then(response => response.rows);

const getBackscratcherById = (id) => pool.query(`select * from backscratchers where id = ${id}`)
    .then(response => response.rows[0]);

const createBackscratcher = (itemName, itemDesc, itemSize, itemCost) =>
    pool.query(`insert into backscratchers (item_name, item_description, item_size, item_cost)
    values ('${itemName}','${itemDesc}', array [${itemSize}], '${itemCost}') returning *`)
    .then(response => response.rows[0]);

module.exports = {
    getAllBackscratchers,
    getBackscratcherById,
    createBackscratcher
}