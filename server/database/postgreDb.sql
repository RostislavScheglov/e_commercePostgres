psql -U postgres
\c e_commerce (name of database)



CREATE TABLE product (
    product_id SERIAL PRIMARY KEY,
    images VARCHAR[],
    cotegory VARCHAR(50),
    title VARCHAR(255),
    content VARCHAR(255) );

CREATE TABLE userTable (
    user_idd SERIAL PRIMARY KEY,
    nickName VARCHAR(255),
    email VARCHAR(255),
    passw VARCHAR(255),
    isAdmin BOOLEAN );
