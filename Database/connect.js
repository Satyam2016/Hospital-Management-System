//  to connect to the database  and create a connection pool
import mysql from 'mysql2';

// create a connection pool to the database
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'satyam',
  database: 'hospital',
});



// get a connection from the pool
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error getting connection from pool:', err);
        return res.status(500).send('Internal Server Error');
    }
      console.log('Database is Connected ');
      connection.release();
});

export default db;
