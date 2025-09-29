// backend/index.js

const express = require('express');
const cors = require('cors');
const { connect, initialize } = require('./database');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// --- Helper Function ---
// Generates a unique 4-digit numeric code
const generateUniqueCode = async (db) => {
    let code;
    let isUnique = false;
    while (!isUnique) {
        code = Math.floor(1000 + Math.random() * 9000).toString();
        const existing = await db.get('SELECT id FROM quizzes WHERE joinCode = ?', code);
        if (!existing) {
            isUnique = true;
        }
    }
    return code;
};


// --- ADMIN ENDPOINT ---
app.post('/api/admin/create-quiz', async (req, res) => {
    const { title, duration, questions } = req.body;

    if (!title || !duration || !questions || !Array.isArray(questions) || questions.length === 0) {
        return res.status(400).json({ error: 'Invalid quiz data provided.' });
    }

    const db = await connect();
    try {
        await db.run('BEGIN TRANSACTION');

        const joinCode = await generateUniqueCode(db);
        
        // Insert into quizzes table
        const quizResult = await db.run(
            'INSERT INTO quizzes (title, duration, joinCode) VALUES (?, ?, ?)',
            [title, duration, joinCode]
        );
        const quizId = quizResult.lastID;

        // Insert questions
        const stmt = await db.prepare('INSERT INTO questions (quizId, questionText, options, correctOptionIndex) VALUES (?, ?, ?, ?)');
        for (const q of questions) {
            await stmt.run(quizId, q.questionText, JSON.stringify(q.options), q.correctOptionIndex);
        }
        await stmt.finalize();

        await db.run('COMMIT');

        res.status(201).json({ message: 'Quiz created successfully!', joinCode, quizId });

    } catch (err) {
        await db.run('ROLLBACK');
        res.status(500).json({ error: err.message });
    }
});


// --- USER ENDPOINTS (UPDATED) ---

// 1. Get a specific quiz by its join code
app.get('/api/quiz/:joinCode', async (req, res) => {
    const { joinCode } = req.params;
    const db = await connect();

    try {
        const quiz = await db.get('SELECT id, title, duration FROM quizzes WHERE joinCode = ?', joinCode);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found.' });
        }

        const questions = await db.all('SELECT id, questionText, options FROM questions WHERE quizId = ?', quiz.id);
        const formattedQuestions = questions.map(q => ({
            ...q,
            options: JSON.parse(q.options)
        }));
        
        res.json({ ...quiz, questions: formattedQuestions });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 2. Submit answers for a specific quiz
app.post('/api/submit', async (req, res) => {
    const { quizId, answers } = req.body; // Expects quizId and answers object { questionId: answerIndex }

    try {
        const db = await connect();
        const correctAnswers = await db.all('SELECT id, correctOptionIndex FROM questions WHERE quizId = ?', quizId);

        let score = 0;
        const results = [];

        for (const question of correctAnswers) {
            const questionId = question.id;
            const isCorrect = answers[questionId] === question.correctOptionIndex;
            
            if (isCorrect) score++;

            results.push({
                questionId: questionId,
                correct: isCorrect,
                userAnswer: answers[questionId],
                correctAnswer: question.correctOptionIndex
            });
        }
        
        res.json({ 
            score, 
            total: correctAnswers.length,
            results
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Start the server
app.listen(port, async () => {
    await initialize();
    console.log(`Backend server running at http://localhost:${port}`);
});