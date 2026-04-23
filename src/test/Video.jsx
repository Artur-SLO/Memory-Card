export default function Video({src}) {
    return (
        <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="video"
        >
            <source src={src} type="video/mp4" />
        </video>
    )
}
