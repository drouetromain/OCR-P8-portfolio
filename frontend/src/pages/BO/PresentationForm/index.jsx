import React, { useState } from 'react';
import PresentationForm from '../../../components/_Backoffice/PresentationForm';
import NavigationForm from '../../../components/_Backoffice/NavigationForm';
import CompetenceForm from '../../../components/_Backoffice/CompetenceForm';
import '../../../components/_Backoffice/Bo.css'


function BoPresentationForm() {
  const [displayMenu, setDisplayMenu] = useState(true);
  const [displayPresentation, setDisplayPresentation] = useState(false);
  const [displayCompetence, setDisplayCompetence] = useState(false);
  
  return (
    <div className='bo-container'>
      <nav className='bo-nav'>
        <div><button onClick={() => (setDisplayMenu(true), setDisplayPresentation(false), setDisplayCompetence(false))}>Menu</button></div>
        <div><button onClick={() => (setDisplayPresentation(true), setDisplayMenu(false), setDisplayCompetence(false))}>Présentation</button></div>
        <div><button onClick={() => (setDisplayCompetence(true), setDisplayMenu(false), setDisplayPresentation(false))}>Compétence</button></div>
      </nav>
      <div>
        <div className={displayMenu ? '' : 'bo-hide-form'}>
          <h2>Gestion du menu</h2>
          <NavigationForm />
        </div>
        <div className={displayPresentation ? '' : 'bo-hide-form'}>
          <h2>Gestion de la présentation</h2>
          <PresentationForm />
        </div>
        <div className={displayCompetence ? '' : 'bo-hide-form'}>
          <h2>Gestion des compétences</h2>
          <CompetenceForm />
        </div>
      </div>
    </div>
    )
  }
  
  export default BoPresentationForm