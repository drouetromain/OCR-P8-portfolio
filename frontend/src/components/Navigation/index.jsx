import React, { useState, useEffect } from 'react';
import { getNavigations } from '../../lib/common-navigation';
import NavItem from '../NavItem';
import '../Hp.css'

function Navigation() {

  // Récupération des présentations
  const [navigation, setNavigation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getNavigationList() {
      const data = await getNavigations();
      if (data) {
        setNavigation(data);
        setLoading(false);
      }
    }
    getNavigationList();
  }, []);

  const displayNavigation = navigation ? navigation.map(({ _id, label, link, target }) =>
    <div key={_id} >
      
      <NavItem _id={_id} label={label} link={link} target={target} />

    </div>)
    :
    <h1>Vide</h1>;
  return (
    <nav className='hp-nav-bar'>
      {loading ? <h1>Chargement en cours...</h1> : displayNavigation}

    </nav>
  );
}

// Presentations.propTypes = {
//   presentations: PropTypes.shape({
//     id: PropTypes.string,
//     userId: PropTypes.string,
//     title: PropTypes.string,
//     description: PropTypes.string,
//     anchorId: PropTypes.string,
//   }).isRequired,
// };

export default Navigation;
