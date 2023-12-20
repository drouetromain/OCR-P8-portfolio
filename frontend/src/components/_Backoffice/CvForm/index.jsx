/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { updateCv, addCv } from '../../../lib/common-cv';
import { getCvs, deleteCv } from '../../../lib/common-cv';
import '../Bo.css'

function CvForm({ cv, validate }) {

  // Récupération des présentations
  const [cvs, setCvs] = useState(null);
  const [isForUpdate, setIsForUpdate] = useState(false);
  const [prez, setPrez] = useState(null);
  const [loading, setLoading] = useState(true);
  const [displayForm, setDisplayForm] = useState(false);
  const [submit, setSubmit] = useState(false);

  // Gestion du formulaire
  const navigate = useNavigate();
  const {
    register, handleSubmit, reset, setValue
  } = useForm({
    defaultValues: useMemo(() => ({
      title: cv?.title,
      description: cv?.description,
      linkLabel: cv?.linkLabel,
      documentUrl: cv?.documentUrl,
    }), [cv]),
  });

  // eslint-disable-next-line max-len

  const displayCvs = () => (cvs ? cvs.map(({ _id, title, description, linkLabel, documentUrl, anchorId }) =>
    <article key={_id} className='bo-article-preview bo-article-preview-presentation'>
      <div>
        <div id={_id} className='bo-article-presentation'>
          <div><span className='bo-article-label'>Titre de la description</span><div className='bo-result-field'>{title}</div></div>
          <div><span className='bo-article-label'>Description</span><div className='bo-result-field'>{description}</div></div>
          <div><span className='bo-article-label'>Label du bouton</span><div className='bo-result-field'>{linkLabel}</div></div>
          <div><span className='bo-article-label'>lien du CV</span><div className='bo-result-field'>{documentUrl}</div></div>
          <div><span className='bo-article-label'>Ancre</span><div className='bo-result-field'>{anchorId}</div></div>
        </div>
      </div>
      <div className='bo-article-btn'>
        <button onClick={async () => {
          // Récupération de l'_id d'une présentation
          const prezId = { _id };
          await setPrez(prezId);
          setDisplayForm(true)
          setIsForUpdate(true)
          setValue('id', _id);
          setValue('title', title);
          setValue('description', description);
          setValue('linkLabel', linkLabel);
          setValue('documentUrl', documentUrl);
          setValue('anchorId', anchorId);
          }} className='bo-btn'>Modifier
        </button>

        <button onClick={async () => {
          // Récupération de l'_id d'une présentation
          const prezId = { _id };
          await setPrez(prezId);
          // Suppression d'une présentation 
          deleteCv(prezId._id);
          if (submit === false) {
            setSubmit(true);
          } else {
            setSubmit(false);
          };
          }} className='bo-btn'>Supprimer
        </button>
      </div>      
      
    </article>) : <h1>Il n'y a pas encore de présentation</h1>
  );


  useEffect(() => {
    reset();
  }, [submit]);

  const onSubmit = async (data) => {
    // Je créé un nouveau cv
    if (!isForUpdate) {
      const newCv = await addCv(data);
      if (!newCv.error) {
        // validate(true);
        setSubmit(true);
        setDisplayForm(false);
        reset();
        console.log('validation ajouté');
        console.log(submit);
      } else {
        alert(newCv.message);
      }
    } else {
      const updatedCv = await updateCv(data, data.id);
      if (!updatedCv.error) {
        setSubmit(true);
        setDisplayForm(false);
        setIsForUpdate(false)
        reset();
        console.log('validation updaté');
      } else {
        alert(updatedCv.message);
      }
    }
  };


  // MAJ des présentations (front)
  useEffect(() => {
    async function displayCvs() {
      const data = await getCvs();
      if (data) {
        setCvs(data);
        setLoading(false);
      }
    }
    displayCvs();
    displayCvs();

  }, [submit]);

  return (
    <section className='bo-section'>
      <div>
        {loading ? <h1>Chargement</h1> : displayCvs()}
      </div>
      <div>
        <div className={displayForm ? 'bo-hide-form' : ''}>
          <button onClick={() => setDisplayForm(true)} className='bo-btn-add'><span class="material-symbols-outlined">add_box</span></button>
        </div> 
        <article className={displayForm ? '' : 'bo-hide-form'}>
          <div className='bo-article-form bo-article-preview'>
            <form onSubmit={handleSubmit(onSubmit)} className={displayForm ? '' : 'bo-hide-form'}>
              <input type="hidden" id="id" {...register('id')} />
              <label htmlFor="title">
              <span className='bo-article-label'>Titre</span>
                <input type="text" id="title" {...register('title')} className='bo-input-field'/>
              </label>
              <label htmlFor="description">
                <span className='bo-article-label'>Description</span>
                <input type="text" id="description" {...register('description')} className='bo-input-field'/>
              </label>
              <label htmlFor="linkLabel">
                <span className='bo-article-label'>Label du bouton</span>
                <input type="text" id="linkLabel" {...register('linkLabel')} className='bo-input-field'/>
              </label>
              <label htmlFor="documentUrl">
                <span className='bo-article-label'>Lien du CV</span>
                <input type="text" id="documentUrl" {...register('documentUrl')} className='bo-input-field'/>
              </label>
              <label htmlFor="anchorId">
                <span className='bo-article-label'>Ancre</span>
                <input type="text" id="anchorId" {...register('anchorId')} className='bo-input-field'/>
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

CvForm.propTypes = {
  cv: PropTypes.shape({
    id: PropTypes.string,
    _id: PropTypes.string,
    userId: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    linkLabel: PropTypes.string,
    documentUrl: PropTypes.string,
    anchorId: PropTypes.string,
  }),
  // validate: PropTypes.func,
};

CvForm.defaultProps = {
  cv: null,
  // validate: null,
};
export default CvForm;
