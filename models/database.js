
const sqlite3 = require('sqlite3').verbose();
const dotenv = require('dotenv');
dotenv.config();

// Connect to SQLite database

const db = new sqlite3.Database(process.env.DB_URL, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Database connected successfully');
    }
});

// Create tables if not exist
db.serialize(() => {

    // db.run(`CREATE TABLE IF NOT EXISTS Tasks (
    //     id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     title TEXT,
    //     description TEXT,
    //     status TEXT,
    //     assignee_id INTEGER,
    //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    //     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    //     FOREIGN KEY(assignee_id) REFERENCES Users(id)
    // )`);

    // // Create Users table
    // db.run(`CREATE TABLE IF NOT EXISTS Users (
    //     id INTEGER PRIMARY KEY,
    //     username TEXT,
    //     email TEXT,
    //     password TEXT
    // )`);
});

module.exports = db;
