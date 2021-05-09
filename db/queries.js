//database imports
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://oxaisvfvutighn:98744731fe1728518ec9fc609c81e5be2fadcfe841b0849c86ad29848ba4aa45@ec2-3-217-219-146.compute-1.amazonaws.com:5432/d774e14havp4nu',
    ssl: {
        rejectUnauthorized: false
    }
});

const getAllBackscratchers = () => pool.query('select * FROM backscratchers')
.then(response => response.rows);

module.exports = {
    getAllBackscratchers
  }