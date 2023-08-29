const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});


connection.connect();

const queryResearchPaperAuthorsCount = `
  SELECT paper_title, COUNT(author_id) AS author_count
  FROM research_papers 
  LEFT JOIN authors_research_papers  ON paper_id = paper_id
  GROUP BY paper_id;
`;

const querySumFemaleAuthorsPapers = `
  SELECT SUM(paper_id) AS total_papers
  FROM authors 
  JOIN authors_research_papers ON author_id = author_id
  JOIN research_papers ON paper_id = paper_id
  WHERE gender = 'Female';
`;

const queryAvgHIndexPerUniversity = `
  SELECT university, AVG(h_index) AS avg_h_index
  FROM authors
  GROUP BY university;
`;

const querySumPapersPerUniversity = `
  SELECT university, COUNT(paper_id) AS total_papers
  FROM authors
  JOIN authors_research_papers ON author_id = author_id
  JOIN research_papers ON paper_id = paper_id
  GROUP BY university;
`;

const queryMinMaxHIndexPerUniversity = `
  SELECT university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index
  FROM authors
  GROUP BY university;
`;

connection.query(queryResearchPaperAuthorsCount, (error, results) => {
  if (error) throw error;

  console.log('Research papers and author counts:');
  console.log(results);
});

connection.query(querySumFemaleAuthorsPapers, (error, results) => {
  if (error) throw error;

  console.log('Total papers by female authors:');
  console.log(results);
});

connection.query(queryAvgHIndexPerUniversity, (error, results) => {
  if (error) throw error;

  console.log('Average h-index per university:');
  console.log(results);
});

connection.query(querySumPapersPerUniversity, (error, results) => {
  if (error) throw error;

  console.log('Total papers per university:');
  console.log(results);
});

connection.query(queryMinMaxHIndexPerUniversity, (error, results) => {
  if (error) throw error;

  console.log('Min and Max h-index per university:');
  console.log(results);
  connection.end();
});