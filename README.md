# AIRTRIBE---PROJECT
Airtribe course management api
**Problem statement:**

**Design database and APIs for application based courses on Airtribe.**

**Database relations:**

- There are multiple instructors on Airtribe.
- Every instructor can start multiple courses.
- Multiple learners can apply for a course using application form (Leads)
- Instructor can add comments against every lead

  1. Design the above relationships on any SQL database.
  2. Create a server in any of your favourite framework using Node.js and add the following APIs
    1. Create course API
    2. Update course details API (name, max_seats, start_date etc)
    3. Course registration API (A user can apply for a course by sharing their name, email, phone 
       number and LinkedIn profile)
    4. Lead update API (Instructor can change status of the lead (Accept / Reject / Waitlist))
    5. Lead search API (Instructor can search leads by name or email)
    6. Add comment API


# Course Management System

A Backend assignment on database application built with Node.js, Express, and MySQL for managing courses and learner registrations.

## Features

- **Course Creation**: Instructors can create new courses with details like title, description, maximum seats, and start date.
- **Course Updates**: Instructors can update course details such as title, description, maximum seats, and start date.
- **Learner Registration**: Learners can register for courses by providing their information and an application form.
- **Lead Management**: Instructors can view and update the status of learner leads (e.g., accepted, rejected, waitlisted).
- **Lead Search**: Instructors can search for learner leads based on name or email.
- **Comment Management**: Instructors can add comments to learner leads for their reference.
- **Course Details**: Instructors can view detailed information about a course, including the instructor name.
- **Lead List**: Instructors can view a list of leads for a specific course, including their application forms and status.
- **Comment List**: Instructors can view a list of comments associated with a learner lead.

## Technologies Used

- **Back-end**: Node.js, Express
- **Database**: MySQL

1. Navigate to the project directory:
   cd airtribe
2. Build and start the Docker containers:
   docker-compose build
   docker-compose up -d
   
This command will spin up the Node.js application and MySQL database containers. The database will be automatically initialized with the necessary tables and test data.

4. Access the application at `http://localhost:3000`.

    ## Loading Test Data
    
    If you need to reload the test data, you can run the following command:
    docker exec -it backend-db-1 bash
    mysql -u root --password=786313 airtribe
    source /tmp/insert_test_data.sql
5. ## APIs

The application provides the following APIs:

- Create a course:
  POST http://localhost:3000/courses
    {
    "title": "Introduction to Web Development",
    "description": "Learn HTML, CSS, and JavaScript to build responsive websites",
    "instructorId": 1,
    "maxSeats": 20,
    "startDate": "2023-06-01"
   }

  
- Update course details
  PUT http://localhost:3000/courses/2
    {
    "title": "Web Development ",
    "description": "Comprehensive course on modern web development",
    "maxSeats": 25,
    "startDate": "2023-07-01"
  }

  
- Course registration
  POST http://localhost:3000/leads
    {
    "courseId": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "987654321",
    "linkedInProfile": "https://linkedin.com/in/johndoe"
    }

  
- Update lead status
  PUT http://localhost:3000/leads/4
    {
    "status": "Accepted"
    }

  
- Add comment to a lead
POST http://localhost:3000/leads/1/comments
  - {
    "status": "Accepted"
    }

    
- Get course details
  GET http://localhost:3000/courses
  
- Get leads for a course
  GET http://localhost:3000/courses//leads
  
- Get comments for a lead
- GET http://localhost:3000/leads/1/comments

6.  This will stop and remove the containers.
    docker-compose down

**here the two sql files named create_tables.sql and insert_test_data.sql are inside the file(directory) named db_scripts
**






