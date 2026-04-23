import { useState } from "react";
import Button from "./Button.jsx"
import Modal from "./Modal.jsx"
import Video from "./Video.jsx"
import video from "../assets/SG.mp4"

export default function App() {
    const [hidden, setHidden] = useState(true)

    function handleClick() {
        console.log('click')
        setHidden(prev => !prev)
    }

    return (
        <div className="mainContainer">
            <Button
                onClick={handleClick}
            />

            <Modal
                message='Game Over'
                score='10'
                video=<Video src={video}/>
                hidden={hidden}
                onClick={handleClick}
            />
        </div>
    )
}
