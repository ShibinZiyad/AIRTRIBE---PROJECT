const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// MySQL connection setup
const connection = mysql.createConnection({
  host:'db',
  user: 'root',
  password: '786313',
  database: 'airtribe'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

// 1. Create course API
app.post('/courses', (req, res) => {
  const { title, description, instructorId, maxSeats, startDate } = req.body;
  const query = 'INSERT INTO Courses (Title, Description, InstructorID, MaxSeats, StartDate) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [title, description, instructorId, maxSeats, startDate], (err, result) => {
    if (err) throw err;
    res.send(`Course created with ID: ${result.insertId}`);
  });
});

// 2. Update course details API
app.put('/courses/:id', (req, res) => {
  const courseId = req.params.id;
  const { title, description, maxSeats, startDate } = req.body;
  const query = 'UPDATE Courses SET Title = ?, Description = ?, MaxSeats = ?, StartDate = ? WHERE CourseID = ?';
  connection.query(query, [title, description, maxSeats, startDate, courseId], (err, result) => {
    if (err) throw err;
    res.send(`Course ${courseId} updated`);
  });
});

// 3. Course registration API
app.post('/leads', (req, res) => {
  const { courseId, name, email, phone, linkedInProfile } = req.body;
  const query = 'INSERT INTO Learners (Name, Email) VALUES (?, ?)';
  connection.query(query, [name, email], (err, result) => {
    if (err) throw err;
    const learnerId = result.insertId;
    const leadQuery = 'INSERT INTO Leads (CourseID, LearnerID, ApplicationForm) VALUES (?, ?, ?)';
    const applicationForm = { name, email, phone, linkedInProfile };
    connection.query(leadQuery, [courseId, learnerId, JSON.stringify(applicationForm)], (err, result) => {
      if (err) throw err;
      res.send(`Lead created with ID: ${result.insertId}`);
    });
  });
});

// 4. Lead update API
app.put('/leads/:id', (req, res) => {
  const leadId = req.params.id;
  const { status } = req.body;
  const query = 'UPDATE Leads SET Status = ? WHERE LeadID = ?';
  connection.query(query, [status, leadId], (err, result) => {
    if (err) throw err;
    res.send(`Lead ${leadId} status updated to ${status}`);
  });
});

// 5. Lead search API
app.get('/leads/search', (req, res) => {
  const { query } = req.query;
  const searchQuery = `
    SELECT l.LeadID, c.Title, lr.Name, lr.Email
    FROM Leads l
    JOIN Courses c ON l.CourseID = c.CourseID
    JOIN Learners lr ON l.LearnerID = lr.LearnerID
    WHERE lr.Name LIKE ? OR lr.Email LIKE ?
  `;
  const searchParam = `%${query}%`;
  connection.query(searchQuery, [searchParam, searchParam], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// 6. Add comment API
app.post('/leads/:id/comments', (req, res) => {
  const leadId = req.params.id;
  const { instructorId, comment } = req.body;
  const query = 'INSERT INTO Comments (LeadID, InstructorID, Comment) VALUES (?, ?, ?)';
  connection.query(query, [leadId, instructorId, comment], (err, result) => {
    if (err) throw err;
    res.send(`Comment added with ID: ${result.insertId}`);
  });
});

// 7. Get course details API
app.get('/courses/:id', (req, res) => {
  const courseId = req.params.id;
  const query = `
    SELECT c.CourseID, c.Title, c.Description, c.MaxSeats, c.StartDate, i.Name AS InstructorName
    FROM Courses c
    JOIN Instructors i ON c.InstructorID = i.InstructorID
    WHERE c.CourseID = ?
  `;
  connection.query(query, [courseId], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      res.send(`Course with ID ${courseId} not found`);
    } else {
      res.send(results[0]);
    }
  });
});

// 8. Get leads for a course API
app.get('/courses/:id/leads', (req, res) => {
  const courseId = req.params.id;
  const query = `
    SELECT l.LeadID, lr.Name, lr.Email, l.ApplicationForm, l.Status
    FROM Leads l
    JOIN Learners lr ON l.LearnerID = lr.LearnerID
    WHERE l.CourseID = ?
  `;
  connection.query(query, [courseId], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// 9. Get comments for a lead API
app.get('/leads/:id/comments', (req, res) => {
  const leadId = req.params.id;
  const query = `
    SELECT c.CommentID, i.Name AS InstructorName, c.Comment
    FROM Comments c
    JOIN Instructors i ON c.InstructorID = i.InstructorID
    WHERE c.LeadID = ?
  `;
  connection.query(query, [leadId], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});