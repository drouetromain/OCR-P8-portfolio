/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { updateSocialmedia, addSocialmedia } from '../../../lib/common-socialmedia';
import { getSocialmedias, deleteSocialmedia } from '../../../lib/common-socialmedia';
import { useFilePreview } from '../../../lib/customHooks';
import '../Bo.css'

function SocialmediaForm({ socialmedia, validate }) {

  // Récupération des réseaux sociaux
  const [socialmedias, setSocialmedias] = useState(null);
  const [isForUpdate, setIsForUpdate] = useState(false);
  const [prez, setPrez] = useState(null);
  const [loading, setLoading] = useState(true);
  const [displayForm, setDisplayForm] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [currentImgUrl, setCurrentImgUrl] = useState(null);

  // Gestion du formulaire
  const navigate = useNavigate();
  const {
    register, watch, handleSubmit, reset, setValue
  } = useForm({
    defaultValues: useMemo(() => ({
      title: socialmedia?.title,
      description: socialmedia?.description,
      anchorId: socialmedia?.anchorId,
      alt: socialmedia?.alt
    }), [socialmedia]),
  });
  const file = watch([]);
  console.log('file: ' + JSON.stringify(file));

  const [filePreview] = useFilePreview(file);

  // eslint-disable-next-line max-len

  const displaySocialmedias = () => (socialmedias ? socialmedias.map(({ _id, link, anchorId, imageUrl, alt}) =>
    <article key={_id} className='bo-article-preview'>
      <div className='bo-drag-and-drop'>
        <span class="material-symbols-outlined">drag_indicator</span>
      </div>
      <div>
        <div id={_id} className='bo-article-competence'>
          
          <div className='bo-article-competence-details'>
            <div><span className='bo-article-label'>Lien</span> <div className='bo-result-field'>{link}</div></div>
            <div><span className='bo-article-label'>Ancre</span> <div className='bo-result-field'>{anchorId}</div></div>
          </div>
          <div className='bo-article-competence-preview'> 
            <div><img src={imageUrl} className='bo-competence-img-preview'/></div>
            <div><span className='bo-article-label'>Alt de l'image </span><div className='bo-result-field'>{alt}</div></div>
          </div>
        </div>
        <div className='bo-article-btn'>
          <button onClick={async () => {
            // Récupération de l'_id d'un reseau social
            const objectId = { _id };
            const imgUrlObject = { imageUrl };
            const imgUrl = imgUrlObject.imageUrl;
            setCurrentImgUrl(imgUrl);
            const imgName = (imgUrl).split("/").slice(-1);
            console.log('imgName:' + imgName);
            await setPrez(objectId);
            setDisplayForm(true)
            setIsForUpdate(true)
            setValue('id', _id);
            setValue('link', link);
            setValue('anchorId', anchorId);
            setValue('file', imageUrl );
            setValue('alt', alt);
            
            console.log('currentImgUrl:' + currentImgUrl);
            console.log('imageUrl:' + imageUrl);
          }} className='bo-btn'>Modifier
          </button>

          <button onClick={async () => {
            // Récupération de l'_id d'un réseau social
            const objectId = { _id };
            await setPrez(objectId);
            // Suppression d'un réseau social
            deleteSocialmedia(objectId._id);
            if (submit === false) {
              setSubmit(true);
            } else {
              setSubmit(false);
            };
          }} className='bo-btn'>Supprimer
          </button>
        </div>
      </div>
    </article>) : <h1>Il n'y a pas encore de réseau social</h1>
  );


  useEffect(() => {
    reset();
  }, [submit]);
  
  const onSubmit = async (data) => {
    if (!data.file[0]) {
      alert('Vous devez ajouter une image');
    }
    // Je créé un nouveau réseau social
    if (!isForUpdate) {
      const newSocialmedia = await addSocialmedia(data);
      if (!newSocialmedia.error) {
        // validate(true);
        if (submit === false) {
          setSubmit(true);
        } else {
          setSubmit(false);
        };
        setDisplayForm(false);
        setCurrentImgUrl();
        reset();
        console.log('validation ajouté');
        console.log(submit);
      } else {
        alert(newSocialmedia.message);
      }
    } else {
      console.log(JSON.stringify(data));
      
      const updatedSocialmedia = await updateSocialmedia(data, data.id);
      if (!updatedSocialmedia.error) {
        if (submit === false) {
          setSubmit(true);
        } else {
          setSubmit(false);
        };
        setDisplayForm(false);
        setIsForUpdate(false)
        setCurrentImgUrl();
        reset();
        console.log('validation updaté');
      } else {
        alert(updatedSocialmedia.message);
      }
    }
  };


  // MAJ des présentations (front)
  useEffect(() => {
    async function displaySocialmedias() {
      const data = await getSocialmedias();
      if (data) {
        setSocialmedias(data);
        setLoading(false);
        console.log('data: ' + JSON.stringify(data));
      }
    }
    displaySocialmedias();
    displaySocialmedias();

  }, [submit]);

  return (
    <section className='bo-section'>
      <div>
        {loading ? <h1>Chargement</h1> : displaySocialmedias()}
      </div>
      <div>
        <div className={displayForm ? 'bo-hide-form' : ''}>
          <button onClick={() => setDisplayForm(true)} className='bo-btn-add'><span class="material-symbols-outlined">add_box</span></button>
        </div> 
        <article className={displayForm ? '' : 'bo-hide-form'}>
          <div className='bo-article-form bo-article-preview'>
            <form onSubmit={handleSubmit(onSubmit)} >
              <input type="hidden" id="id" {...register('id')}/>
              <label htmlFor="link">
                <span className='bo-article-label'>Lien</span>
                <input type="text" id="link" {...register('link')} className='bo-input-field'/>
              </label>
              <label htmlFor="anchorId">
                <span className='bo-article-label'>Ancre</span>
                <input type="text" id="anchorId" {...register('anchorId')} className='bo-input-field'/>
              </label>
              <span className='bo-article-label'>Image</span>
              <div>
                  {filePreview || currentImgUrl ? (
                    <div className='bo-form-modify-img'>
                      <img src={filePreview ?? currentImgUrl} alt="preview" />
                      <span className='bo-article-label'>Modifier</span>
                    </div>
                  ) : (
                    <div className='bo-icon-and-label'>
                      <span class="material-symbols-outlined">image</span>
                      <span className='bo-article-label'>Ajouter une image</span>
                    </div>
                  )}

              </div>
              <label htmlFor="file">
                <input {...register('file')} type="file" id="file" name='file' />
              </label>
              <label htmlFor="alt">
                <span className='bo-article-label'>Balise Alt</span>
                <input type="text" id="alt" {...register('alt')} className='bo-input-field'/>
              </label>
              <div className='bo-article-btn'>
                <button onClick={() => { setDisplayForm(false); reset() }} className='bo-btn'>Annuler</button>
                <button type="submit" className='bo-btn'>Publier</button>
              </div>
            </form>
          </div>
        </article>
      </div>
    </section>
  );
}

SocialmediaForm.propTypes = {
  socialmedia: PropTypes.shape({
    id: PropTypes.string,
    _id: PropTypes.string,
    userId: PropTypes.string,
    link: PropTypes.string,
    anchorId: PropTypes.string,
    imageUrl: PropTypes.string,
    alt: PropTypes.string,
  }),
  // validate: PropTypes.func,
};

SocialmediaForm.defaultProps = {
  socialmedia: null,
  // validate: null,
};
export default SocialmediaForm;