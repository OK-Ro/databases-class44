
const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "world",
});


connection.connect();

const queryAuthorsAndMentors = `
  SELECT author_name, author_name AS mentor_name
  FROM authors 
  LEFT JOIN authors  ON mentor = author_id;
`;

connection.query(queryAuthorsAndMentors, (error, results) => {
  if (error) throw error;

  console.log('Authors and their mentors:');
  console.log(results);
  connection.end();
});