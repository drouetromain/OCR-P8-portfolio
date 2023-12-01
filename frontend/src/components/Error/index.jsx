import { Link } from 'react-router-dom'

function Error() {
    return (
      <div className="error"> 
            <h1>404</h1>
            <h2>Oups! La page que vous demandez n'existe pas.</h2>
            <div id="home-link">
            <Link to="/">Retournez sur la page d'accueil</Link>
            </div>
      </div>
    )
  }
  
  export default Error