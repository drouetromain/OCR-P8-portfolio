/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { updatePresentation, addPresentation } from '../../../lib/common';
import { getPresentations, deletePresentation } from '../../../lib/common';
import '../Bo.css'

function PresentationForm({ presentation, validate }) {

  // Récupération des présentations
  const [presentations, setPresentations] = useState(null);
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
      title: presentation?.title,
      description: presentation?.description,
      anchorId: presentation?.anchorId
    }), [presentation]),
  });

  // const onDelete = async (e) => {
  //   if (e.key && e.key !== 'Enter') {
  //     return;
  //   }
  //   // eslint-disable-next-line no-restricted-globals
  //   const check = confirm('Etes vous sûr de vouloir supprimer ce livre ?');
  //   if (check) {
  //     const del = await deletePresentation(prez._id);
  //     if (del) {
  //       setPresentations((oldValue) => ({ ...oldValue, delete: true }));
  //     }
  //   }
  // };

  // eslint-disable-next-line max-len

  const displayPresentations = () => (presentations ? presentations.map(({ _id, title, description, anchorId }) =>
    <article key={_id} className='bo-article-preview'>
      <div>
        <div id={_id} className='bo-article-presentation'>
          <div><span className='bo-article-label'>Titre de la description</span><div className='bo-result-field'>{title}</div></div>
          <div><span className='bo-article-label'>Description</span><div className='bo-result-field'>{description}</div></div>
          <div><span className='bo-article-label'>Ancre</span><div className='bo-result-field'>{anchorId}</div></div>
        </div>
        <button onClick={async () => {
          // Récupération de l'_id d'une présentation
          const prezId = { _id };
          await setPrez(prezId);
          setDisplayForm(true)
          setIsForUpdate(true)
          setValue('id', _id);
          setValue('title', title);
          setValue('description', description);
          setValue('anchorId', anchorId);
        }} className='bo-btn'>Modifier
        </button>

        <button onClick={async () => {
          // Récupération de l'_id d'une présentation
          const prezId = { _id };
          await setPrez(prezId);
          // Suppression d'une présentation 
          deletePresentation(prezId._id);
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
    // Je créé une nouvelle presentation
    if (!isForUpdate) {
      const newPresentation = await addPresentation(data);
      if (!newPresentation.error) {
        // validate(true);
        setSubmit(true);
        setDisplayForm(false);
        reset();
        console.log('validation ajouté');
        console.log(submit);
      } else {
        alert(newPresentation.message);
      }
    } else {
      const updatedPresentation = await updatePresentation(data, data.id);
      if (!updatedPresentation.error) {
        setSubmit(true);
        setDisplayForm(false);
        setIsForUpdate(false)
        reset();
        console.log('validation updaté');
      } else {
        alert(updatedPresentation.message);
      }
    }
  };


  // MAJ des présentations (front)
  useEffect(() => {
    async function displayPresentations() {
      const data = await getPresentations();
      if (data) {
        setPresentations(data);
        setLoading(false);
      }
    }
    displayPresentations();
    displayPresentations();

  }, [submit]);

  return (
    <section className='bo-section'>
      <div>
        {loading ? <h1>Chargement</h1> : displayPresentations()}
      </div>
      <div>
        <button className={displayForm ? 'bo-hide-form' : ''} onClick={() => setDisplayForm(true)} className='bo-btn'>Ajouter</button>
        <article className='bo-article-preview' className={displayForm ? '' : 'bo-hide-form'}>
          <div className='bo-article-form'>
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
              <label htmlFor="anchorId">
                <span className='bo-article-label'>Ancre</span>
                <input type="text" id="anchorId" {...register('anchorId')} className='bo-input-field'/>
              </label>
              <button type="submit" className='bo-btn'>Publier</button>
            </form>
          </div>
        </article>
      </div>
      
    </section>
  );
}

PresentationForm.propTypes = {
  presentation: PropTypes.shape({
    id: PropTypes.string,
    _id: PropTypes.string,
    userId: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    anchorId: PropTypes.string,
  }),
  // validate: PropTypes.func,
};

PresentationForm.defaultProps = {
  presentation: null,
  // validate: null,
};
export default PresentationForm;
