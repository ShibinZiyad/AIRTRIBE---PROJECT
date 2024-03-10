-- Create the database
CREATE DATABASE airtribe;
USE airtribe;

-- Create Instructors table
CREATE TABLE Instructors (
  InstructorID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(255) NOT NULL
);

-- Create Courses table
CREATE TABLE Courses (
  CourseID INT AUTO_INCREMENT PRIMARY KEY,
  Title VARCHAR(255) NOT NULL,
  Description TEXT,
  InstructorID INT NOT NULL,
  MaxSeats INT NOT NULL,
  StartDate DATE,
  FOREIGN KEY (InstructorID) REFERENCES Instructors(InstructorID)
);

-- Create Learners table
CREATE TABLE Learners (
  LearnerID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL
);

-- Create Leads table
CREATE TABLE Leads (
  LeadID INT AUTO_INCREMENT PRIMARY KEY,
  CourseID INT NOT NULL,
  LearnerID INT NOT NULL,
  ApplicationForm JSON,
  Status ENUM('Accepted', 'Rejected', 'Waitlisted') DEFAULT 'Waitlisted',
  FOREIGN KEY (CourseID) REFERENCES Courses(CourseID),
  FOREIGN KEY (LearnerID) REFERENCES Learners(LearnerID)
);

-- Create Comments table
CREATE TABLE Comments (
  CommentID INT AUTO_INCREMENT PRIMARY KEY,
  LeadID INT NOT NULL,
  InstructorID INT NOT NULL,
  Comment TEXT NOT NULL,
  FOREIGN KEY (LeadID) REFERENCES Leads(LeadID),
  FOREIGN KEY (InstructorID) REFERENCES Instructors(InstructorID)
);