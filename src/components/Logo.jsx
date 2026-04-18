import LogoImg from '../../public/Pokemon-Logo.png'

export default function Logo({sizeClass="logo"}) {
    return (
        <>
            <img src={LogoImg} alt="MemoryCard Logo" className={sizeClass}/>
        </>
    )
}
