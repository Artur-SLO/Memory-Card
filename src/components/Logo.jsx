import LogoImg from '../assets/Pokemon-Logo.png'

export default function Logo({sizeClass="logo", onClick}) {
    return (
        <>
            <img src={LogoImg} alt="MemoryCard Logo" className={sizeClass} onClick={onClick}/>
        </>
    )
}
