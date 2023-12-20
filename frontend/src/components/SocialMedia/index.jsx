import '../../components/Hp.css'

function SocialMedia({ link, alt, imageUrl, anchorId }) {
    return (
        <div id={anchorId} className="hp-footer-socialmedia">
            <a href={link} target="_blank" rel="noreferrer"><img src={imageUrl} alt={alt} /></a>
        </div>
    )
}

export default SocialMedia;