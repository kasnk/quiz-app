import { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState(60);
    const [questions, setQuestions] = useState([
        { questionText: '', options: ['', '', '', ''], correctOptionIndex: 0 }
    ]);
    const [createdQuizCode, setCreatedQuizCode] = useState('');
    const [error, setError] = useState('');

    const handleAddQuestion = () => {
        setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctOptionIndex: 0 }]);
    };

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (qIndex, oIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = value;
        setQuestions(newQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setCreatedQuizCode('');
        try {
            const payload = { title, duration, questions };
            const response = await axios.post('http://localhost:3001/api/admin/create-quiz', payload);
            setCreatedQuizCode(response.data.joinCode);
        } catch (err) {
            setError('Failed to create quiz. Please check all fields.');
        }
    };

    return (
        <div className="admin-dashboard">
            <h2 id='crt'>Create a New Quiz</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Quiz Title</label>
                    <input className="form-control" type="text" placeholder="Quiz title (e.g., JavaScript Basics)" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Duration (in seconds)</label>
                    <input className="form-control" type="number" placeholder="e.g., 60" value={duration} onChange={(e) => setDuration(parseInt(e.target.value))} required />
                </div>

                {questions.map((q, qIndex) => (
                    <div key={qIndex} className="question-editor">
                        <h4><span className="question-chip">Frame Question</span></h4>
                        <input
                            type="text"
                            placeholder="Question Text"
                            value={q.questionText}
                            onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
                            required
                            className="form-control"
                        />
                        {q.options.map((opt, oIndex) => (
                            <div key={oIndex} className="option-input">
                                <input
                                    type="radio"
                                    name={`correct-option-${qIndex}`}
                                    checked={q.correctOptionIndex === oIndex}
                                    onChange={() => handleQuestionChange(qIndex, 'correctOptionIndex', oIndex)}
                                />
                                <input
                                    type="text"
                                    placeholder={`Option ${oIndex + 1}`}
                                    value={opt}
                                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                    required
                                    className="form-control"
                                />
                            </div>
                        ))}
                    </div>
                ))}
                
                <button type="button" onClick={handleAddQuestion} className="btn btn-secondary add-question-btn">Add Another Question</button>
                <button type="submit" className="btn btn-primary submit-button">Create Quiz</button>
            </form>

            {createdQuizCode && (
                <div className="success-message">
                    Quiz created successfully! Share this code with users: <strong>{createdQuizCode}</strong>
                </div>
            )}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default AdminDashboard;
