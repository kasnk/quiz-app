const ResultsPage = ({ results, questions }) => {
    const { score, total } = results;

    const getOptionText = (questionId, optionIndex) => {
        const question = questions.find(q => q.id === questionId);
        return question ? question.options[optionIndex] : '';
    };

    return (
        <div className="results-page">
            <h2>Quiz Completed!</h2>
            <h3 className="results-score"><span className="score-label">Your Score: </span><span className="score-number">{score}</span><span className="score-sep"> / </span><span className="score-total">{total}</span></h3>

            <div className="results-breakdown">
                <h4>Answer Review:</h4>
                {results.results.map((result, index) => (
                    <div key={index} className={`result-item ${result.correct ? 'correct' : 'incorrect'}`}>
                        <p className="question-text"><span className="question-label">Question :</span><span className="question-value"> {questions.find(q => q.id === result.questionId)?.questionText}</span></p>
                        <p className="your-answer"><span className="answer-label">Your answer: </span><span className="answer-value">{getOptionText(result.questionId, result.userAnswer) || "Not answered"}</span></p>
                        {!result.correct && (
                            <p className="correct-answer">Correct answer: {getOptionText(result.questionId, result.correctAnswer)}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResultsPage;
