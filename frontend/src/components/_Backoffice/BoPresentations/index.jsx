import * as PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { getPresentations } from '../../../lib/common';
import BoPresentation from '../BoPresentation';

function BoPresentations() {

   // Récupération des présentations
   const [presentations, setPresentations] = useState(null);
   const [loading, setLoading] = useState(true);
   // eslint-disable-next-line max-len
  const displayPresentations = () => (presentations ? presentations.map(({ _id, title, description, anchorId }) => <div key={_id} ><BoPresentation _id={_id} title={title} description={description} anchorId={anchorId} /></div>) : <h1>Vide</h1>);
 
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
  
  return (
    <section>
      {loading ? <h1>Chargement</h1> : displayPresentations()}
    </section>
  );
}

export default BoPresentations;
