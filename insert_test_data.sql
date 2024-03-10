USE airtribe;

-- Insert data into Instructors table
INSERT INTO Instructors (Name) VALUES
('John Doe'),
('Jane Smith'),
('Michael Johnson');

-- Insert data into Courses table
INSERT INTO Courses (Title, Description, InstructorID, MaxSeats, StartDate) VALUES
('Introduction to Web Development', 'Learn HTML, CSS, and JavaScript to build responsive websites', 1, 20, '2023-06-01'),
('Data Science Fundamentals', 'Explore the basics of data analysis, visualization, and machine learning', 2, 25, '2023-07-15'),
('Digital Marketing Strategies', 'Discover effective marketing techniques for online businesses', 3, 30, '2023-09-01');

-- Insert data into Learners table
INSERT INTO Learners (Name, Email) VALUES
('Alice Williams', 'alice@example.com'),
('Bob Anderson', 'bob@example.com'),
('Charlie Brown', 'charlie@example.com'),
('David Davis', 'david@example.com'),
('Emily Evans', 'emily@example.com');

-- Insert data into Leads table
INSERT INTO Leads (CourseID, LearnerID, ApplicationForm, Status) VALUES
(1, 1, '{"name": "Alice Williams", "email": "alice@example.com", "phone": "1234567890", "linkedInProfile": "https://linkedin.com/alice"}', 'Accepted'),
(1, 2, '{"name": "Bob Anderson", "email": "bob@example.com", "phone": "9876543210", "linkedInProfile": "https://linkedin.com/bob"}', 'Waitlisted'),
(2, 3, '{"name": "Charlie Brown", "email": "charlie@example.com", "phone": "5551234567", "linkedInProfile": "https://linkedin.com/charlie"}', 'Accepted'),
(2, 4, '{"name": "David Davis", "email": "david@example.com", "phone": "7891011121", "linkedInProfile": "https://linkedin.com/david"}', 'Rejected'),
(3, 5, '{"name": "Emily Evans", "email": "emily@example.com", "phone": "3141592654", "linkedInProfile": "https://linkedin.com/emily"}', 'Waitlisted');

-- Insert data into Comments table
INSERT INTO Comments (LeadID, InstructorID, Comment) VALUES
(1, 1, 'Promising candidate with good experience'),
(3, 2, 'Requires additional preparation in statistics'),
(5, 3, 'Strong marketing background');