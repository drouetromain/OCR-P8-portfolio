import { Link } from 'react-router-dom'
import SocialMedia from '../../components/SocialMedia/'

function Footer() {
    return (
        <div>
            <h2>Réseaux Sociaux</h2>
            <SocialMedia />
            <Link to="/">Propriété intellectuelle</Link>
            <Link to="/">Mentions légales</Link>
            <div>(c) Romain DROUET - 2023</div>
        </div>
    )
}

export default Footer