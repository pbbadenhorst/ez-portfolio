-- Up
CREATE TABLE user (
    id integer PRIMARY KEY,
    name text,
    email text UNIQUE,
    password text
);

-- Down
DROP TABLE user;
