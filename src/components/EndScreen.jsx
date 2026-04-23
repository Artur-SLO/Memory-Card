export default function EndScreen({message, score, video, onRestart}) {
    return (
        <div className={'modal-container'}>
            <div className="modal">
                <h1 className="modal-message">{message}</h1>
                {video}
                <p className="modal-score">Your final score is <strong>{score}</strong></p>
                <button className="modal-button difficulty-button animated-button" onClick={onRestart}>Play Again</button>
            </div>
        </div>
    )
}
