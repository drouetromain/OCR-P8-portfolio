/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { updatePresentation, addPresentation } from '../../../lib/common';
import { getPresentations, deletePresentation } from '../../../lib/common';

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
    <div key={_id}>
      <div id={_id}>
        <div>Titre de la description : {title}</div>
        <div>Description : {description}</div>
        <div>Ancre : {anchorId}</div>
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
      }}>Modifier
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
      }}>Supprimer
      </button>
    </div>) : <h1>Il n'y a pas encore de présentation</h1>
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
    <section>
      {loading ? <h1>Chargement</h1> : displayPresentations()}
      <button className={displayForm ? 'bo-hide-form' : ''} onClick={() => setDisplayForm(true)}>Ajouter</button>

      <form onSubmit={handleSubmit(onSubmit)} className={displayForm ? '' : 'bo-hide-form'}>
        <input type="hidden" id="id" {...register('id')} />
        <label htmlFor="title">
          <p>Titre :</p>
          <input type="text" id="title" {...register('title')} />
        </label>
        <label htmlFor="description">
          <p>Description :</p>
          <input type="text" id="description" {...register('description')} />
        </label>
        <label htmlFor="anchorId">
          <p>Ancre :</p>
          <input type="text" id="anchorId" {...register('anchorId')} />
        </label>
        <button type="submit" >Publier</button>
      </form>
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
