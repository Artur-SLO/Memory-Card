import audioEnabled from "../assets/volume-high.svg"
import audioDisabled from "../assets/volume-low.svg"
import questionMark from "../assets/help.svg"

export default function Footer({ isAudioEnabled, isHintEnabled, setAudio }) {
    return (
        <div className="footer-container">
            <button className="audio-manager"></button>
            <div className="hint-container"></div>
        </div>
    )
}
