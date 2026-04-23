import { useTiltEffect } from '../hooks/useTiltEffect.js';
import cardBack from '../assets/card-back.png'

export default function Card({ name, image, onClick, flipped }) {
    const tilt = useTiltEffect();

    return (
        <div className="card-container" onClick={() => onClick(name)}>
            <div className={`card-inner ${flipped ? "flipped" : ""}`}>

                <div className="card-face card-front">
                    <div {...tilt} className="card">
                        <img src={image} alt={name} />
                        <p className="card-name">{name}</p>
                    </div>
                </div>

                <div className="card-face card-back">
                    <img src={cardBack} alt="Card Back" />
                </div>

            </div>
        </div>
    );
}
