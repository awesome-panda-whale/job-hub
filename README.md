# job-app
Tracking Job Applications for Applicants

CREATE TABLE Users ( 
  id SERIAL PRIMARY KEY, 
  username VARCHAR(255) UNIQUE NOT NULL, 
  firstname VARCHAR(255),
  lastname VARCHAR(255), 
  email VARCHAR(255), 
  password VARCHAR(255) NOT NULL ); 

Delete from users;

alter table users 
add email VARCHAR(255);

INSERT INTO Users (username, firstname, lastname, email, password)
VALUES ('lalaland', 'Lala', 'Land', 'lalaland@lalaland.com', '123');

select * from users;

CREATE TABLE Applications ( 
  id SERIAL PRIMARY KEY, 
  company VARCHAR(255) NOT NULL, 
  position VARCHAR(255) NOT NULL, 
  url VARCHAR(255),
  date_applied TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status_id INT,
  contact VARCHAR(255),
  email VARCHAR(255),
  notes TEXT );

INSERT INTO Applications (company, position, url, date_applied, status_id, contact, email, notes)
VALUES ('Google', 'AI engineer', 'https://www.google.com/about/careers/applications/jobs/results/106035622694527686-senior-engineer-machine-learning-forecast-planning', '2024-06-18 00:26:51.985033+00', 13, '098765432', 'hr@google.com', 'oral offer');

select * from Applications;

SELECT NOW();


CREATE TABLE Status (
  id SERIAL PRIMARY KEY, 
  status VARCHAR(255)
);

INSERT INTO Status (id, status)
VALUES 
(1, 'Need to Apply'),
(2, 'Applied'),
(3, 'Phone Interview'),
(4, 'Online Assessment'),
(5, 'Inital Interview'),
(6, 'Second Interview'),
(7, 'Third Interview'),
(8, 'Technical Interview'),
(9, 'Behavioral Interview'),
(10, 'Final Interview'),
(11, 'Have not heard back'),
(12, 'Considering'),
(13, 'Offer'),
(14, 'Rejected'),
(15, 'Ghost'),
(16, 'Other'),
(17, 'STOP');

select * from Status;
