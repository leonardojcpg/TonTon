
-- Table for 'baby'
CREATE TABLE baby (
  baby_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  age INT,
  weight DECIMAL(5,2),
  blood_type baby_blood_type,
  -- Add other baby-related fields as needed
);

-- Table for 'users'
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  -- Add other user-related fields as needed
);

-- Table for 'users_babies' to represent the N:N relationship
CREATE TABLE users_babies (
  user_id INT REFERENCES users(user_id),
  baby_id INT REFERENCES baby(baby_id),
  PRIMARY KEY (user_id, baby_id)
);

-- Table for 'sleep'
CREATE TABLE sleep (
  sleep_id SERIAL PRIMARY KEY,
  baby_id INT REFERENCES baby(baby_id),
  date DATE,
  start_time TIME,
  duration INTERVAL,
  -- Add other sleep-related fields as needed
);

-- Table for 'diapers'
CREATE TABLE diapers (
  diapers_id SERIAL PRIMARY KEY,
  baby_id INT REFERENCES baby(baby_id),
  label VARCHAR(255),
  size diapers_size,
  quantity INT,
  -- Add other diapers-related fields as needed
);

-- Table for 'breast_feeding'
CREATE TABLE breast_feeding (
  breast_feeding_id SERIAL PRIMARY KEY,
  baby_id INT REFERENCES baby(baby_id),
  time TIME,
  side breast_feeding_side,
  hour INT,
  -- Add other breast_feeding-related fields as needed
);

-- Table for 'diary'
CREATE TABLE diary (
  diary_id SERIAL PRIMARY KEY,
  baby_id INT REFERENCES baby(baby_id),
  date DATE,
  hour TIME,
  observation TEXT,
  -- Add other diary-related fields as needed
);
