export default function Button({onClick}) {
    const style = {
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        alignItems: 'center',
    }
    return(
        <div className="button-container" style={style}>
            <button className="difficulty-button animated-button" onClick={onClick}>Open</button>
        </div>
    )
}
