import { useState } from "react";
import DifficultySelector from "./DifficultySelector";
import Deck from "./Deck";
import EndScreen from "./EndScreen";
import Score from "./Score"
import { SCREENS } from "../functions/Constants";
import createPokemonDeck from "../hooks/createPokemonDeck";
import Background from "./Background";
import Logo from "./Logo";
import Header from "./Header";
import Loader from "./Loading";

export default function App() {
    const [deckSize, setDeckSize] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);
    const [screen, setScreen] = useState(SCREENS.DEFAULT);
    const [reloadDeck, setReloadDeck] = useState(false);

    const { deck, loading } = createPokemonDeck(deckSize, reloadDeck);


    function handleOnHit() {
        const nextValue = currentScore + 1;
        setCurrentScore(nextValue);

        if(nextValue == deckSize) {
            setScreen(SCREENS.VICTORY);
        }
    }

    function handleFinalScore(value) {
        setBestScore(prev => value > prev ? value : prev);
        setCurrentScore(0);

        if(screen != SCREENS.VICTORY) {
            setScreen(SCREENS.DEFEAT);
        }
        setDeckSize(deckSize);
    }

    function handleSelectDifficulty(value) {
        setDeckSize(value);
        setScreen(SCREENS.PLAYING);
    }

    function restartGame() {
        handleFinalScore(currentScore);
        setReloadDeck(prev => !prev);
        setScreen(SCREENS.DEFAULT);
    }

    return (
        <>
            <Background />
            {screen === SCREENS.DEFAULT && (
                <div className="start-page">
                    <div className="logo-container">
                        <Logo sizeClass="big-logo"/>
                        <h1 className="start-text">Memory Game</h1>
                    </div>
                    <DifficultySelector onSelectDifficulty={handleSelectDifficulty} /> </div>
            )}

            {loading && screen !== SCREENS.DEFAULT && <Loader />}

            {screen === SCREENS.PLAYING && !loading && (
                <div className="game-page">
                    <Header 
                        Score=<Score
                            score={currentScore}
                            best={bestScore}
                            total={deckSize}
                        />
                        onClick={restartGame}
                    />
                    <Deck
                        cards={deck}
                        onHit={handleOnHit}
                        onMiss={handleFinalScore}
                    />
                </div>
            )}

            {screen === SCREENS.DEFEAT && (
                <EndScreen
                    message="Game Over!"
                    score={currentScore}
                    onRestart={restartGame}
                />
            )}

            {screen === SCREENS.VICTORY && (
                <EndScreen
                    message="You Win!"
                    score={currentScore}
                    onRestart={restartGame}
                />
            )}
        </>
    );
}
