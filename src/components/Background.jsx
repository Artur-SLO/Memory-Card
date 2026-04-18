import backgroundVideo from '../../public/pokemon-gif.mp4';

export default function Background() {
    return (
        <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="background-video"
        >
            <source src={backgroundVideo} type="video/mp4" />
        </video>
    )
}
