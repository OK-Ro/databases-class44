
const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "world",
});

connection.connect();

const createAuthorsTableQuery = `
  CREATE TABLE authors (
    author_id INT PRIMARY KEY,
    author_name VARCHAR(255),
    university VARCHAR(255),
    date_of_birth DATE,
    h_index INT,
    gender VARCHAR(10)
  );
`;

const addMentorColumnQuery = `
  ALTER TABLE authors
  ADD COLUMN mentor INT,
  ADD FOREIGN KEY (mentor) REFERENCES authors(author_id);
`;

connection.query(createAuthorsTableQuery, (error, results) => {
  if (error) throw error;

  console.log('Authors table created.');

  connection.query(addMentorColumnQuery, (error, results) => {
    if (error) throw error;

    console.log('Mentor column added.');
    connection.end();
  });
});