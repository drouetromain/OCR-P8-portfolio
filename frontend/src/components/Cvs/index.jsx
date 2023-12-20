import React, { useState, useEffect } from 'react';
import { getCvs } from '../../lib/common-cv';
import Cv from '../Cv';
import '../../components/Hp.css'

function Cvs() {

  // Récupération des présentations
  const [cvs, setCvs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCvsList() {
      const data = await getCvs();
      if (data) {
        setCvs(data);
        setLoading(false);
      }
    }
    getCvsList();
  }, []);

  const displayCvs =   cvs ? cvs.map(({ _id, title, description, linkLabel, documentUrl, anchorId }) => <article key={_id}><Cv _id={_id} title={title} description={description} linkLabel={linkLabel} documentUrl={documentUrl} anchorId={anchorId} /></article>) : <h1>Vide</h1>;
  return (
    <section>
      {loading ? <h1>Chargement en cours...</h1> : displayCvs}

    </section>
  );
}

export default Cvs;
