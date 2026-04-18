import { useState, useEffect } from "react";
import Card from "./Card";
import Shuffle from "../functions/Shuffle";

export default function Deck({cards, onHit, onMiss}) {
    const [clicked, setClicked] = useState(new Set());
    const [deck, setDeck] = useState(cards);
    const [flipped, setFlipped] = useState(false);
    const [isAnimating, setIsAnimating] = useState(true);

    function handleClick(name) {
        if (isAnimating) return;
        if (!clicked.has(name)) {
            onHit();
            setClicked(prev => new Set([...prev, name]));

            setFlipped(true);

            setTimeout(() => {
                setDeck(prev => Shuffle([...prev]));
            }, 300);

            setIsAnimating(true)

            setTimeout(() => {
                setFlipped(false);
                setIsAnimating(false)
            }, 1000);

            return;
        }

        onMiss(clicked.size);
    }

    useEffect(() => {
        const start = setTimeout(() => {
            setFlipped(true);
        }, 10);

        const shuffle = setTimeout(() => {
            setDeck(prev => Shuffle([...prev]));
        }, 500);

        const end = setTimeout(() => {
            setFlipped(false);
            setIsAnimating(false);
        }, 1200);

        return () => {
            clearTimeout(start);
            clearTimeout(shuffle);
            clearTimeout(end);
        };
    }, []);

    return (
        <div className="deck-container">
            {deck.map(card => (
                <Card
                    key={card.name}
                    name={card.name}
                    image={card.sprite}
                    onClick={handleClick}
                    flipped={flipped}
                />
            ))}
        </div>
    );
}
