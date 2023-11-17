-- CREATE TABLE for 'users'
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  relationship user_relationship NOT NULL
);

-- CREATE TABLE for 'baby'
CREATE TABLE IF NOT EXISTS baby (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  weight DECIMAL(5, 2) NOT NULL,
  blood_type baby_blood_type NOT NULL
);

-- CREATE TABLE for 'breast_feeding'
CREATE TABLE IF NOT EXISTS breast_feeding (
  id SERIAL PRIMARY KEY,
  baby_id INT NOT NULL,
  time TIMESTAMP NOT NULL,
  side breast_feeding_side NOT NULL,
  hour DECIMAL(4, 2) NOT NULL,
  FOREIGN KEY (baby_id) REFERENCES baby(id)
);

-- CREATE TABLE for 'diapers'
CREATE TABLE IF NOT EXISTS diapers (
  id SERIAL PRIMARY KEY,
  baby_id INT NOT NULL,
  label VARCHAR(50) NOT NULL,
  size diapers_size NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (baby_id) REFERENCES baby(id)
);

-- CREATE TABLE for 'sleep'
CREATE TABLE IF NOT EXISTS sleep (
  id SERIAL PRIMARY KEY,
  baby_id INT NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  duration INT NOT NULL,
  FOREIGN KEY (baby_id) REFERENCES baby(id)
);

-- CREATE TABLE for 'diary'
CREATE TABLE IF NOT EXISTS diary (
  id SERIAL PRIMARY KEY,
  baby_id INT NOT NULL,
  date DATE NOT NULL,
  hour TIME NOT NULL,
  observation TEXT NOT NULL,
  FOREIGN KEY (baby_id) REFERENCES baby(id)
);