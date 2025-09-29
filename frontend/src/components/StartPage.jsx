import axios from 'axios';
import { useState } from 'react';

const StartPage = ({ onStart }) => {
    const [joinCode, setJoinCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleJoinQuiz = async () => {
        if (!joinCode.match(/^\d{4}$/)) {
            setError('Please enter a valid 4-digit code.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`http://localhost:3001/api/quiz/${joinCode}`);
            onStart(response.data);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to find quiz. Please check the code.');
            setLoading(false);
        }
    };

    return (
        <div className="start-page">
            <h2>Join a Quiz</h2>
            <p id="joinCodeHelp" className="field-hint">Enter the 4-digit code provided by the administrator.</p>
            <input
                id="joinCode"
                type="text"
                inputMode="numeric"
                pattern="\d{4}"
                maxLength="4"
                placeholder="Enter 4-digit code"
                aria-describedby="joinCodeHelp"
                aria-invalid={!!error}
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                className="form-control join-code-input"
            />
            <button className="btn btn-primary" onClick={handleJoinQuiz} disabled={loading}>
                {loading ? 'Joining...' : 'Join Quiz'}
            </button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default StartPage;
