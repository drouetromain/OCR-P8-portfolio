import { Link } from 'react-router-dom'

function Header() {
    return (
        <div>
            <h1>Portfolio</h1>
            <nav>
                <Link to="/">Présentation</Link>
                <Link to="/">Mes compétences</Link>
                <Link to="/">Mes services</Link>
                <Link to="/">Portfolio</Link>
                <Link to="/">Mon CV</Link>
                <Link to="/">Contact</Link>
            </nav>
        </div>
    )
}

export default Header