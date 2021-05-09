//database imports
const { response } = require('express');
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
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

const updateBackscratcherById = (id, itemName, itemDesc, itemSize, itemCost) =>
    pool.query(`update backscratchers set item_name = '${itemName}', item_description = '${itemDesc}',
    item_size = array [${itemSize}], item_cost = '${itemCost}' where id = ${id} returning *`)
        .then(response => response.rows[0]);

const deleteBackscratcherById = (id) => pool.query(`delete from backscratchers where id = ${id} returning *`)
    .then(response => response.rows[0]);

module.exports = {
    getAllBackscratchers,
    getBackscratcherById,
    createBackscratcher,
    updateBackscratcherById,
    deleteBackscratcherById
}