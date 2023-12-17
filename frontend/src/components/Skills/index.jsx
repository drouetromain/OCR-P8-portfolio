import React, { useState, useEffect } from 'react';
import { getCompetences } from '../../lib/common-competence';
import SkillCard from '../../components/SkillCard/'

function Skills() {

  // Récupération des présentations
  const [competences, setCompetences] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCompetencesList() {
      const data = await getCompetences();
      if (data) {
        setCompetences(data);
        setLoading(false);
      }
    }
    getCompetencesList();
  }, []);

    const displayCompetences = competences ? competences.map(({ _id, title, anchorId, imageUrl, alt, description }) => <div key={_id} ><SkillCard title={title} anchorId={anchorId} imageUrl={imageUrl} alt={alt} description={description} /></div>) : <h1>Vide</h1>;
  return (
    <section>
      {loading ? <h1>Chargement en cours...</h1> : displayCompetences}

    </section>
  );
}

export default Skills;