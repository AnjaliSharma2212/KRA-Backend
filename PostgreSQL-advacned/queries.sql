-- JOINS

-- Joins are used to combine rows from two or more tables based on a related column
-- used when we want some data which have some relation


-- How to create table
-- created a users table

--------------------------------------- tables are created----------------------.

-- CREATE TABLE customers(
--     id SERIAL PRIMARY KEY,
--     name TEXT NOT NULL,
--     email TEXT UNIQUE
-- )

-- CREATE TABLE productOrder(
--     id SERIAL PRIMARY KEY,
--     user_id INT REFERENCES customers(id),
--     product TEXT,
--     amount NUMERIC
-- )

-- -- ----------------------------Insert data into tables --------------------------

-- INSERT INTO customers (name, email) 
-- VALUES 
--     ('Anjali','anjali@example.com'),
--    ( 'Nitish','ni@example.com'),
--    ('Divanshi','div@example.com')
-- INSERT INTO productOrder (user_id, product, amount)
-- VALUES 
--     (1, 'Laptop', 2000000),
--     (2, 'Mouse', 1000),
--    ( 3, 'Keyboard', 2000)

-----------------------------------------Show the data----------------------------
-- SELECT * FROM customers
-- SELECT * FROM productorder

 --UPDATE customers set id=4 where id=3

-- -------------------------------------- JOINS--------------------

-- -------------------------INNER JOIN


-- SELECT * 
-- from customers as u
-- INNER JOIN productOrder as o
-- ON u.id= o.id

-- inner join gives us the mached data in both the tables -> return only match rows.


-- LEFT JOIN

-- returns all records from the left table and the matched records from the right table.

-- SELECT c.name, p.product
-- FROM customers AS c
-- LEFT JOIN productorder AS p
-- ON c.id= p.id

-- same as left -> returns all records from right and only matched data from left table

-- SELECT c.name, p.product
-- FROM customers AS c
-- RIGHT JOIN productorder AS p
-- ON c.id= p.user_id

-- Full joins
 -- returns all recods when there is a match in either left or right table
-- SELECT * 
-- FROM customers as c
-- FULL OUTER JOIN productorder as p
-- ON c.id= p.id

-- Create index----

-- CREATE UNIQUE INDEX idx_user_email ON customers(email)

--- This will be fast because of index----
-- If we have large data then it will be helpfull"--
-- index should be unique----

-- SELECT name from customers where email ='anjali@example.com'



-----------------------------TRANSACTIONS-------------------------------

-- CREATE TABLE accounts(
--     id SERIAL PRIMARY KEY,
--     name TEXT ,
--     balance NUMERIC CHECK(balance >=0)
-- )

-- INSERT INTO accounts(name, balance) VALUES

-- ('Rahul',6000000),
-- ('Nitish', 2000000000)
-- SELECT * from accounts

-- UPDATE accounts SET balance = balance- 2008990 WHERE name= 'Rahul'


--  BEGIN;
--  UPDATE accounts SET balance= balance+345566 WHERE name='Nitish';
--  UPDATE accounts SET balance= balance - 567432 WHERE name='Anjali';
--  COMMIT;


----------------------JSONB--------------------

-- in postgres data store in the binary json

-- CREATE TABLE products (
--   id SERIAL PRIMARY KEY,
--   name TEXT,
--   metadata JSONB
-- );

-- INSERT INTO products (name, metadata)
-- VALUES (
--   'Laptop',
--   '{"brand":"Dell","ram":"16GB","color":"Black"}'
-- );

--QUeryy----
-- SELECT name
-- FROM products
-- WHERE metadata->>'brand' = 'Dell';

-- Operator	Meaning
-- ->	     Get JSON object
-- ->>	     Get text
-- @>      contains


--------RANGE PARTIONING-------------------

-- CREATE TABLE sales (
--   id SERIAL,
--   sale_date DATE NOT NULL,
--   amount NUMERIC
-- ) PARTITION BY RANGE (sale_date);

-- CREATE TABLE sales_2025
-- PARTITION OF sales
-- FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');

-- CREATE TABLE sales_2026
-- PARTITION OF sales
-- FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');

-- INSERT INTO sales (sale_date, amount)
-- VALUES ('2025-06-01', 10000);