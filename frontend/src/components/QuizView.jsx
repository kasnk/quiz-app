import { useState, useEffect } from 'react';
import axios from 'axios';

const QuizView = ({ quizData, onFinish }) => {
    const { questions, duration, id: quizId } = quizData;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [timer, setTimer] = useState(duration);

    const currentQuestion = questions[currentQuestionIndex];
    
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prev => {
                if (prev === 1) {
                    handleSubmit();
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleSelectOption = (optionIndex) => {
        setUserAnswers({
            ...userAnswers,
            [currentQuestion.id]: optionIndex
        });
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = async () => {
        try {
            const payload = { quizId, answers: userAnswers };
            const response = await axios.post('http://localhost:3001/api/submit', payload);
            onFinish(response.data);
        } catch (error) {
            console.error("Error submitting quiz:", error);
        }
    };
    
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="quiz-view">
            <div className="quiz-header">
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                <span className="timer">Time Left: {formatTime(timer)}</span>
            </div>
            
            <div className="question-container">
                <h3>{currentQuestion.questionText}</h3>
                <div className="options-container">
                    {currentQuestion.options.map((option, index) => (
                        <button 
                            key={index}
                            className={`option-button ${userAnswers[currentQuestion.id] === index ? 'selected' : ''}`}
                            onClick={() => handleSelectOption(index)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            <div className="navigation-buttons">
                <button className="btn btn-outline-secondary" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                    Previous
                </button>
                {currentQuestionIndex < questions.length - 1 ? (
                    <button className="btn btn-outline-secondary" onClick={handleNext}>Next</button>
                ) : (
                    <button onClick={handleSubmit} className="btn btn-primary submit-button">Submit</button>
                )}
            </div>
        </div>
    );
};

export default QuizView;
