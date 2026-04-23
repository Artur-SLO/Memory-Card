import { useState, useEffect, useRef } from "react";
import DifficultySelector from "./DifficultySelector";
import Deck from "./Deck";
import Score from "./Score"
import { SCREENS, STATE, VIDEOS, AUDIOS  } from "../functions/Constants";
import createPokemonDeck from "../hooks/createPokemonDeck";
import Background from "./Background";
import Logo from "./Logo";
import Header from "./Header";
import Loader from "./Loading";
import EndScreen from "./EndScreen";
import Video from "./Video";
import Footer from "./Footer";
import hintImg from "../assets/hint.webp";

export default function App() {
    // States
    const [deckSize, setDeckSize] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);
    const [screen, setScreen] = useState(SCREENS.DEFAULT);
    const [reloadDeck, setReloadDeck] = useState(false);
    const [state, setState] = useState(STATE.DEFAULT);
    const [showHint, setShowHint] = useState(false);

    // Refs / Music States
    const [audio, setAudio] = useState(true);
    const [music, setMusic] = useState(false);
    const victoryAudioRef = useRef(new Audio(AUDIOS.VICTORY));
    const defeatAudioRef = useRef(new Audio(AUDIOS.DEFEAT));
    const flipAudioRef = useRef(new Audio(AUDIOS.FLIP));
    const clickAudioRef = useRef(new Audio(AUDIOS.CLICK));
    const confirmAudioRef = useRef(new Audio(AUDIOS.CONFIRM));
    const bgMusicRef = useRef(new Audio(AUDIOS.BG));

    useEffect(() => {
        const bg = bgMusicRef.current;
        bg.loop = true;
        bg.volume = 0.3;

        if (music) {
            bg.play()
        } else {
            bg.pause();
        }

        return () => bg.pause();
    }, [music]);

    // API call
    const { deck, loading } = createPokemonDeck(deckSize, reloadDeck);

    // Game Functions
    function handleSelectDifficulty(value) {
        playSound(confirmAudioRef);
        setDeckSize(value);
        setScreen(SCREENS.PLAYING)
        setTimeout(() => {
            playSound(flipAudioRef);
        }, 500)
    }

    function restartGame() {
        handleFinalScore(currentScore);
        setCurrentScore(0);
        stopAllSounds();
        playSound(confirmAudioRef);
        setReloadDeck(prev => !prev);
        setScreen(SCREENS.DEFAULT);
        setState(STATE.DEFAULT);
    }

    function handleOnHit() {
        playSound(flipAudioRef);

        const nextValue = currentScore + 1;
        setCurrentScore(nextValue);

        if(nextValue == deckSize) {
            playSound(victoryAudioRef);
            setState(STATE.VICTORY);
        }
    }

    function handleFinalScore(value) {
        setBestScore(prev => value > prev ? value : prev);
        if(screen != SCREENS.VICTORY) {
            playSound(defeatAudioRef);
            setState(STATE.DEFEAT);
        }
        setDeckSize(deckSize);
    }

    function handleHint() {
        playSound(clickAudioRef);
        setShowHint(true);

        setTimeout(() => {
            setShowHint(false);
        }, 5000);
    }

    // Sound Functions
    function playSound(audioRef) {
        if (!audio) return;

        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0.3;
        audioRef.current.play();
    }

    function stopAllSounds() {
        [victoryAudioRef, defeatAudioRef, confirmAudioRef, clickAudioRef, flipAudioRef].forEach(ref => {
            ref.current.pause();
            ref.current.currentTime = 0;
        });
    }

    function toggleAudio() {
        playSound(clickAudioRef);
        setAudio(prev => !prev);
    }

    function toggleMusic() {
        playSound(clickAudioRef);
        setMusic(prev => !prev);
    }

    // App
    return (
        <>
            <Background />
            {screen === SCREENS.DEFAULT && (
                <div className="start-page">
                    <div className="logo-container">
                        <Logo sizeClass="big-logo"/>
                        <h1 className="start-text">Memory Game</h1>
                    </div>
                    <DifficultySelector onSelectDifficulty={handleSelectDifficulty} />
                </div>
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
                        state={state}
                    />
                </div>
            )}

            {state === STATE.VICTORY && (
                <EndScreen
                    message="You Win!"
                    score={currentScore}
                    hidden={false}
                    video=<Video src={VIDEOS.VICTORY} alt="Victory Video!"/>
                    onRestart={restartGame}
                />
            )}

            {state === STATE.DEFEAT && (
                <EndScreen
                    message="Game Over!"
                    score={currentScore}
                    hidden={false}
                    video=<Video src={VIDEOS.DEFEAT} alt="Defeat Video!"/>
                    onRestart={restartGame}
                />
            )}
            {showHint && (

                <div className="hint-popup">
                    <div className="hint-cards">
                        <div className="hint-card">
                            Don't click on the same card twice!
                        </div>

                        <div className="hint-card">
                            Click on POKÉMON logo to go back
                        </div>
                    </div>

                    <img src={hintImg} className="hint-hero" />
                </div>
            )}
            <Footer 
                isAudioEnabled={audio}
                isBgMusicEnabled={music}
                showHint={handleHint}
                setAudio={toggleAudio}
                setMusic={toggleMusic}

            />
        </>
    );
}
