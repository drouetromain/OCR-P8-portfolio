import React, { useState } from 'react';
import PresentationForm from '../../../components/_Backoffice/PresentationForm';
import NavigationForm from '../../../components/_Backoffice/NavigationForm';
import CompetenceForm from '../../../components/_Backoffice/CompetenceForm';
import ServiceForm from '../../../components/_Backoffice/ServiceForm';
import '../../../components/_Backoffice/Bo.css';


function BoPresentationForm() {
  const [displayMenu, setDisplayMenu] = useState(true);
  const [displayPresentation, setDisplayPresentation] = useState(false);
  const [displayCompetence, setDisplayCompetence] = useState(false);
  const [displayService, setDisplayService] = useState(false);
  
  return (
    <div className='bo-container'>
      <nav className='bo-nav'>
        <div className='bo-nav-link'>
          <span class="material-symbols-outlined">menu</span>
          <button onClick={() => (setDisplayMenu(true), setDisplayPresentation(false), setDisplayCompetence(false), setDisplayService(false))} className='bo-nav-btn'>Navigation</button>
        </div>
        <div className='bo-nav-link'>
          <span class="material-symbols-outlined">subtitles</span>
          <button onClick={() => (setDisplayMenu(true), setDisplayPresentation(false), setDisplayCompetence(false), setDisplayService(false))} className='bo-nav-btn'>Hero</button>
        </div>
        <div className='bo-nav-link'>
          <span class="material-symbols-outlined">co_present</span>
          <button onClick={() => (setDisplayPresentation(true), setDisplayMenu(false), setDisplayCompetence(false), setDisplayService(false))} className='bo-nav-btn'>Présentation</button>
        </div>
        <div className='bo-nav-link'>
          <span class="material-symbols-outlined">lightbulb</span>
          <button onClick={() => (setDisplayCompetence(true), setDisplayMenu(false), setDisplayPresentation(false), setDisplayService(false))} className='bo-nav-btn'>Compétences</button>
        </div>
        <div className='bo-nav-link'>
          <span class="material-symbols-outlined">accessibility_new</span>
          <button onClick={() => (setDisplayService(true), setDisplayCompetence(false), setDisplayMenu(false), setDisplayPresentation(false))} className='bo-nav-btn'>Services</button>
        </div>
        <div className='bo-nav-link'>
          <span class="material-symbols-outlined">menu_book</span>
          <button onClick={() => (setDisplayCompetence(true), setDisplayMenu(false), setDisplayPresentation(false))} className='bo-nav-btn'>Portfolio</button>
        </div>
        <div className='bo-nav-link'>
          <span class="material-symbols-outlined">workspace_premium</span>
          <button onClick={() => (setDisplayCompetence(true), setDisplayMenu(false), setDisplayPresentation(false))} className='bo-nav-btn'>Mon CV</button>
        </div>
        <div className='bo-nav-link'>
          <span class="material-symbols-outlined">contact_page</span>
          <button onClick={() => (setDisplayCompetence(true), setDisplayMenu(false), setDisplayPresentation(false))} className='bo-nav-btn'>Contact</button>
        </div>
        <div className='bo-nav-link'>
          <span class="material-symbols-outlined">footprint</span>
          <button onClick={() => (setDisplayCompetence(true), setDisplayMenu(false), setDisplayPresentation(false))} className='bo-nav-btn'>Footer</button>
        </div>
        <div className='bo-nav-link'>
        <span class="material-symbols-outlined">logout</span>
          <button onClick={() => (setDisplayCompetence(true), setDisplayMenu(false), setDisplayPresentation(false))} className='bo-nav-btn'>Deconnexion</button>
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
        <div className={displayService ? '' : 'bo-hide-form'}>
          <div className='bo-h2-block'>
          <div className='bo-h2-icon'><span class="material-symbols-outlined">edit_square</span></div><h2>Gestion des services</h2>
          </div>
          <ServiceForm />
        </div>
      </section>
    </div>
    )
  }
  
  export default BoPresentationForm