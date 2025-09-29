// backend/database.js

const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const dbFile = 'quiz.db';
let db;

const connect = async () => {
    if (db) return db;
    db = await open({
        filename: dbFile,
        driver: sqlite3.Database
    });
    // Enable foreign key support
    await db.exec('PRAGMA foreign_keys = ON;');
    return db;
};

const initialize = async () => {
    const db = await connect();

    // Table for quizzes
    await db.exec(`
        CREATE TABLE IF NOT EXISTS quizzes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            duration INTEGER NOT NULL, -- in seconds
            joinCode TEXT NOT NULL UNIQUE
        );
    `);

    // Modified questions table with a foreign key to quizzes
    await db.exec(`
        CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            quizId INTEGER NOT NULL,
            questionText TEXT NOT NULL,
            options TEXT NOT NULL,
            correctOptionIndex INTEGER NOT NULL,
            FOREIGN KEY (quizId) REFERENCES quizzes(id) ON DELETE CASCADE
        );
    `);
    
    // We'll no longer seed the database here, as admins will create quizzes.
};

module.exports = { connect, initialize };