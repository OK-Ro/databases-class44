const { Pool } = require('pg');

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'trasaction',
  password: 'hYfpassword',
  port: 5432, 
});

// Create the account table
pool.query(`
  CREATE TABLE IF NOT EXISTS account (
    account_number SERIAL PRIMARY KEY,
    balance DECIMAL(10, 2) NOT NULL
  );
`);

// Create the account_changes table
pool.query(`
  CREATE TABLE IF NOT EXISTS account_changes (
    change_number SERIAL PRIMARY KEY,
    account_number INT REFERENCES account(account_number),
    amount DECIMAL(10, 2) NOT NULL,
    changed_date TIMESTAMP NOT NULL,
    remark TEXT
  );
`);

pool.end();
