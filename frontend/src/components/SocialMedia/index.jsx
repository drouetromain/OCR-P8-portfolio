import '../../components/Hp.css'

function SocialMedia({ link, alt, imageUrl, anchorId }) {
    return (
        <button id={anchorId} className='hp-footer-socialmedia glow-effect'>
            <a href={link} target="_blank" rel="noreferrer"><img src={imageUrl} alt={alt}/></a>
        </button>
    )
}

export default SocialMedia;