import Logo from "./Logo"

export default function Header({Score}) {
    return (
        <div className="game-header">
            <div className="logo-container">
                <Logo />
                <h1 className="game-header-text">Memory Game</h1>
            </div>
            {Score}
        </div>
    )
}
