-- ENUM for 'relationship' in the 'users' table
CREATE TYPE user_relationship AS ENUM ('parent', 'grandparent', 'other');

-- ENUM for 'blood_type' in the 'baby' table
CREATE TYPE baby_blood_type AS ENUM ('a+', 'a-', 'b+', 'b-', 'ab+', 'ab-', 'o+', 'o-');

-- ENUM for 'side' in the 'breast_feeding' table
CREATE TYPE breast_feeding_side AS ENUM ('left', 'right');

-- ENUM for 'size' in the 'diapers' table
CREATE TYPE diapers_size AS ENUM ('n', 's', 'm', 'l', 'xl', 'xxl');
