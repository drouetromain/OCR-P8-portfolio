import React, { useState, useEffect } from 'react';
import { getSocialmedias } from '../../lib/common-socialmedia';
import SocialMedia from '../../components/SocialMedia/'
import '../../components/Hp.css'

function SocialMedias() {

  // Récupération des présentations
  const [socialmedias, setSocialmedias] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSocialmediasList() {
      const data = await getSocialmedias();
      if (data) {
        setSocialmedias(data);
        setLoading(false);
      }
    }
    getSocialmediasList();
  }, []);

    const displaySocialmedias = socialmedias ? socialmedias.map(({ _id, link, anchorId, imageUrl, alt }) => <div key={_id} ><SocialMedia link={link} anchorId={anchorId} imageUrl={imageUrl} alt={alt} /></div>) : <h1>Vide</h1>;
  return (
    <div className='hp-footer-socialmedias hp-div'>
      {loading ? <h1>Chargement en cours...</h1> : displaySocialmedias}  
    </div>
  );
}

export default SocialMedias;