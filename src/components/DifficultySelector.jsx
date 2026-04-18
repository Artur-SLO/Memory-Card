import { DIFFICULTIES } from "../functions/Constants";

export default function DifficultySelector({ onSelectDifficulty }) {
    return (
        <div className="difficulty-options">
            {Object.entries(DIFFICULTIES).map(([label, value]) => (
                <button
                    key={label}
                    onClick={() => onSelectDifficulty(value)}
                    className="difficulty-button"
                >
                    {label}
                </button>
            ))}
        </div>
    );
}
