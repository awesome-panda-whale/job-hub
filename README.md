# job-app
Tracking Job Applications for Applicants

- Table Schema

CREATE TABLE Users ( 
  id SERIAL PRIMARY KEY, 
  username VARCHAR(255) UNIQUE NOT NULL, 
  firstname VARCHAR(255),
  lastname VARCHAR(255), 
  email VARCHAR(255), 
  password VARCHAR(255) NOT NULL ); 

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

CREATE TABLE Status (
  id SERIAL PRIMARY KEY, 
  status VARCHAR(255)
);

CREATE TABLE users_applications (
  user_id INT NOT NULL,
  application_id INT NOT NULL,
  PRIMARY KEY (user_id, application_id),
  FOREIGN KEY (user_id) REFERENCES Users(id),
  FOREIGN KEY (application_id) REFERENCES Applications(id)
);