1. JOINS in PostgresSQL:
-> Joins are used to compare the data from two tables.
-> a. INNER JOIN
     -> When we want data which is common in both the tables.
     -> it returns the records which are common in both the tables.
-> b. LEFT JOIN
     -> When we want the all records from left table and common matched rows from other table.
     -> we need to follow the pattern in this -> the first table we mentioned that will be treated as Left table  

-> c. RIGHT JOIN
     ->When we want the all records from right table and common matched rows from other table.
     
-> d. FULL OUTER JOIN
     -> it returns the all records from both the tables, if any table has null data/ rows it will mentioned as null.


2. INDEXES: 
-> Indexes improve speed
----Without Index-> full table scan
----With Index -> fast lookup

3. TRANSACTIONS:
-> transactions are used to execute a group of SQL operations as a single unit of work.
-> if one operations fails the entire transaction fails.
-> This ensures the ACID properties.
-> ACID:
-> Atomicity -> ALL Or Nothing -> all should succesfully complete-> COMMIT
                               -> if one fails then entire transaction -> ROLLBACK.
-> Consistency -> Database transfer from one valid state to other valid state
               -> Foreign key must remain valid
               -> if rule break -> transaction fails.
-> Isolation -> transaction will not interfare each other incorrectly.
-> Durability -> after Commit data is permanently saved(even if system fails)

4. JSONB:
-> data stored in PostgresSQL in form form of JSONB
-> Binary JSON
-> Operator	Meaning
    ->   	Get JSON object
    ->>	    Get text
    @>      contains

5. Range Partitioning 
-> data is partition by some Range  
-> used for large data table.

6. pg_dump / pg_restore

-> Used for database backup & restore.

-> Backup Database
-> pg_dump -U postgres -d mydb -f backup.sql
-> Restore
-> psql -U postgres -d mydb -f backup.sql
-> Custom Format (Recommended)
-> pg_dump -U postgres -d mydb -Fc -f backup.dump

-> Restore:

-> pg_restore -U postgres -d mydb backup.dump
-> Backup Specific Table
-> pg_dump -U postgres -d mydb -t users -f users_backup.sql


🚀 Real Production Usage
Feature	Real Scenario
INNER JOIN	Fetch user orders
LEFT JOIN	Show inactive users
Index	Login system
Transaction	Payment processing
JSONB	Flexible product attributes
Partitioning	Large logs table
pg_dump	Production backup