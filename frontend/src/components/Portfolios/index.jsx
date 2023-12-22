import React, { useState, useEffect } from 'react';
import { getPortfolios } from '../../lib/common-portfolio';
import Portfolio from '../../components/Portfolio/'
import '../../components/Hp.css'

function Portfolios() {

  // Récupération des présentations
  const [portfolios, setPortfolios] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPortfoliosList() {
      const data = await getPortfolios();
      if (data) {
        setPortfolios(data);
        setLoading(false);
      }
    }
    getPortfoliosList();
  }, []);

  const displayPortfolios = portfolios ? portfolios.map(({ _id, title, anchorId, imageUrl, alt, description, filters }) => <div key={_id} className='hp-portfolio-card hp-div'><Portfolio title={title} anchorId={anchorId} imageUrl={imageUrl} alt={alt} description={description} filters={ filters } /></div>) : <h1>Vide</h1>;
  return (
    <section className='hp-section-skills'>
      <h2 className='hp-h2 gradient-text' id="portfolio">Portfolio</h2>
      <article className='hp-skills-block'>
        {loading ? <h1>Chargement du portfolio...</h1> : displayPortfolios}
      </article>
      

    </section>
  );
}

export default Portfolios;