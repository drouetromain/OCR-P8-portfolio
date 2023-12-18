import React, { useState, useEffect } from 'react';
import { getHeros } from '../../lib/common-hero';
import Hero from '../../components/Hero/'

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

    const displayHeros = heros ? heros.map(({ _id, title, anchorId, imageUrl, alt, subTitle }) => <div key={_id} ><Hero title={title} anchorId={anchorId} imageUrl={imageUrl} alt={alt} subTitle={subTitle} /></div>) : <h1>Vide</h1>;
  return (
    <section>
      {loading ? <h1>Chargement en cours...</h1> : displayHeros}

    </section>
  );
}

export default Heros;