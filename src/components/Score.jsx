export default function Score({score, best, total}) {
    return (
        <div className="scoreboard">
            <p>Score: {score} / {total}</p>
            <p className="high-score">Best Score: {best}</p>
        </div>
    )
}
