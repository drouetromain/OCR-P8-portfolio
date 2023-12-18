import React, { useState, useEffect } from 'react';
import { getPresentations } from '../../lib/common';
import Presentation from '../Presentation';
import '../../components/Hp.css'

function Presentations() {

  // Récupération des présentations
  const [presentations, setPresentations] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPresentationsList() {
      const data = await getPresentations();
      if (data) {
        setPresentations(data);
        setLoading(false);
      }
    }
    getPresentationsList();
  }, []);

  const displayPresentations =   presentations ? presentations.map(({ _id, title, description, anchorId }) => <div key={_id} ><Presentation _id={_id} title={title} description={description} anchorId={anchorId} /></div>) : <h1>Vide</h1>;
  return (
    <section className='hp-section-presentation'>
      {loading ? <h1>Chargement en cours...</h1> : displayPresentations}

    </section>
  );
}

export default Presentations;
