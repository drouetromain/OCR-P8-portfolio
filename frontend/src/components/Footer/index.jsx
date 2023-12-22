import { Link } from 'react-router-dom'
import SocialMedias from '../../components/SocialMedias/'

function Footer() {
    return (
        <section className='hp-article-footer'>
            <h2 id="reseaux-sociaux" className='hp-h2 gradient-text'>Réseaux Sociaux</h2>
            <article>
                <SocialMedias />
            </article>
            <div className='hp-footer-links-block'>
                <Link to="/" className='hp-footer-link'>Propriété intellectuelle</Link>
                <Link to="/" className='hp-footer-link'>Mentions légales</Link>
                <Link to="/signin" className='hp-footer-link'>Connexion</Link>
            </div>
            
            <div className='hp-copyright'><sup>©</sup> Romain DROUET - 2023</div>
        </section>
    )
}

export default Footer