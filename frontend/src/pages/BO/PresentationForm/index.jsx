import React, { useState } from 'react';
import PresentationForm from '../../../components/_Backoffice/PresentationForm';
import NavigationForm from '../../../components/_Backoffice/NavigationForm';
import CompetenceForm from '../../../components/_Backoffice/CompetenceForm';
import '../../../components/_Backoffice/Bo.css';


function BoPresentationForm() {
  const [displayMenu, setDisplayMenu] = useState(true);
  const [displayPresentation, setDisplayPresentation] = useState(false);
  const [displayCompetence, setDisplayCompetence] = useState(false);
  
  return (
    <div className='bo-container'>
      <nav className='bo-nav'>
        <div className='bo-nav-link'>
        <span class="material-symbols-outlined">menu</span>
          <button onClick={() => (setDisplayMenu(true), setDisplayPresentation(false), setDisplayCompetence(false))} className='bo-nav-btn'>Menu</button>
        </div>
        <div className='bo-nav-link'>
          <span class="material-symbols-outlined">co_present</span>
          <button onClick={() => (setDisplayPresentation(true), setDisplayMenu(false), setDisplayCompetence(false))} className='bo-nav-btn'>Présentation</button>
        </div>
        <div className='bo-nav-link'>
        <span class="material-symbols-outlined">lightbulb</span>
          <button onClick={() => (setDisplayCompetence(true), setDisplayMenu(false), setDisplayPresentation(false))} className='bo-nav-btn'>Compétence</button>
        </div>
      </nav>
      <section className='bo-section'>
        <div className={displayMenu ? '' : 'bo-hide-form'}>
          <div className='bo-h2-block'>
            <div className='bo-h2-icon'><span class="material-symbols-outlined">edit_square</span></div><h2>Gestion du menu</h2>
          </div>
          <NavigationForm />
        </div>
        <div className={displayPresentation ? '' : 'bo-hide-form'}>
          <div className='bo-h2-block'>
          <div className='bo-h2-icon'><span class="material-symbols-outlined">edit_square</span></div><h2>Gestion de la présentation</h2>
          </div>
          <PresentationForm />
        </div>
        <div className={displayCompetence ? '' : 'bo-hide-form'}>
          <div className='bo-h2-block'>
          <div className='bo-h2-icon'><span class="material-symbols-outlined">edit_square</span></div><h2>Gestion des compétences</h2>
          </div>
          <CompetenceForm />
        </div>
      </section>
    </div>
    )
  }
  
  export default BoPresentationForm