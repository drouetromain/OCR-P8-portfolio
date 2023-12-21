import React, { useState, useEffect } from 'react';
import { getServices } from '../../lib/common-service';
import ServiceCard from '../ServiceCard';
import '../../components/Hp.css'

function Services() {

  // Récupération des présentations
  const [services, setServices] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getServicesList() {
      const data = await getServices();
      if (data) {
        setServices(data);
        setLoading(false);
      }
    }
    getServicesList();
  }, []);

  const displayServices =   services ? services.map(({ _id, title, description, anchorId }) => <div key={_id} className='hp-div'><ServiceCard _id={_id} title={title} description={description} anchorId={anchorId} /></div>) : <h1>Vide</h1>;
  return (
    <section className='hp-section-presentation'>
        <h2 className='hp-h2' id="services">Services proposés</h2>
        {loading ? <h1>Chargement en cours...</h1> : displayServices}

    </section>
  );
}

export default Services;
