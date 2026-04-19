import Logo from "./Logo"

export default function Header({Score, onClick}) {
    return (
        <div className="game-header">
            <div className="logo-container">
                <Logo onClick={onClick}/>
                <h1 className="game-header-text">Memory Game</h1>
            </div>
            {Score}
        </div>
    )
}
