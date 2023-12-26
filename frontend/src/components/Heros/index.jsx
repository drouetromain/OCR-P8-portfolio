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

  const displayHeros = heros ? heros.map(({ _id, title, anchorId, imageUrl, alt, subTitle }) => <div key={_id} className='hp-div'><div><Header /></div><Hero title={title} anchorId={anchorId} imageUrl={imageUrl} alt={alt} subTitle={subTitle} /></div>) : <h1>Vide</h1>;
  
  // Animation sur le Titre
  document.onload = function () {
    console.log('Le dom est chargé')
  }

  if (loading === true) {
    console.log('Le loading est terminé')
    function whenLoaded() {
      
      console.log('animation chargée');
    }
    setTimeout(whenLoaded, 3000);
    
  }
  return (
    <section>
      
      {loading ? <h1>Chargement en cours...</h1> : displayHeros}
    </section>
  );
}

export default Heros;