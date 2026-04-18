export default function EndScreen({ message, onRestart }) {
    return (
        <div className="end-screen">
            <h1>{message}</h1>
            <button onClick={onRestart}>
                Play Again
            </button>
        </div>
    );
}
