import React, { useState, useEffect } from 'react';
import { getHeros } from '../../lib/common-hero';
import Hero from '../../components/Hero/';
import Header from '../../components/Header/';

function Heros() {
  // Récupération des présentations
  const [heros, setHeros] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getHerosList() {
      const data = await getHeros();
      if (data) {
        setHeros(data);
        setLoading(false);
      }
    }
    getHerosList();
  }, []);

  // Animation sur le Titre
  document.onload = function () {
    console.log('Le dom est chargé')
  }

  // if (loading === true) {
  //   console.log('Le loading est terminé')
  //   function whenLoaded() {
  //     console.log('animation chargée');
  //     let el = document.getElementById('js-hero-img');
  //     // inclu les padding, border & scrollbar.
  //     console.log(el.offsetHeight);
  //     let imgHeight = el.offsetHeight;
  //   }
  //   setTimeout(whenLoaded, 3000);
    
  // }

  const displayHeros = heros ? heros.map(({ _id, title, anchorId, imageUrl, alt, subTitle, imgHeight }) =>
    <div key={_id} className='hp-div'>
      <div className='content'>
        <div className='visible'>
            <p>
          
            </p>
            <ul>
            <li>ROMAIN</li>
            <li>DROUET</li>
            <li>.COM</li>
            </ul>
        </div>
      </div>
      <Header />
      <Hero title={title} anchorId={anchorId} imageUrl={imageUrl} alt={alt} subTitle={subTitle} imgHeight={imgHeight} />
    </div>) : <h1>Vide</h1>;
  
  
  return (
    <section className='hp-section-hero'>
      
      {loading ? <h1>Chargement en cours...</h1> : displayHeros}
    </section>
  );
}

export default Heros;