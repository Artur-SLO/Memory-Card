import Logo from "./Logo"

export default function Header({Score, onClick}) {
    return (
        <div className="game-header">
            <div className="header-logo">
                <Logo onClick={onClick}/>
            </div>
            {Score}
        </div>
    )
}
