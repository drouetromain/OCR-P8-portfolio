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

    const displayServices = services ? services.map(({ _id, title, description, anchorId, tags }) => <div key={_id} className='hp-div hp-services-card border-color-effect'><ServiceCard _id={_id} title={title} description={description} anchorId={anchorId} tags={tags} /></div>) : <h1>Vide</h1>;
  return (
    <section className='hp-section-presentation'>
        <h2 className='hp-h2 gradient-text' id="services">Services proposés</h2>
        <div className='hp-services-block'>
            {loading ? <h1>Chargement en cours...</h1> : displayServices}      
        </div>
        

    </section>
  );
}

export default Services;
