export default function Modal({message, score, video, hidden=false, onClick}) {
    return (
        <div className={hidden ? 'hidden' : 'modal-container'}>
            <div className="modal">
                <h1 className="modal-message">{message}</h1>
                {video}
                <p className="modal-score">Your final score is <strong>{score}</strong></p>
                <button className="modal-button difficulty-button animated-button" onClick={onClick}>Close</button>
            </div>
        </div>
    )
}
