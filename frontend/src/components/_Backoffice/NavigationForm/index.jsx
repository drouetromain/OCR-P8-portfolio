/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { updateNavigation, addNavigation } from '../../../lib/common-navigation';
import { getNavigations, deleteNavigation } from '../../../lib/common-navigation';

function NavigationForm({ navigation, validate }) {

  // Récupération des présentations
  const [navigations, setNavigations] = useState(null);
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
      label: navigation?.label,
      link: navigation?.link,
      target: navigation?.target
    }), [navigation]),
  });

  // eslint-disable-next-line max-len

  const displayNavigations = () => (navigations ? navigations.map(({ _id, label, link, target }) =>
    <div key={_id}>
      <div id={_id}>
        <div>Label du lien : {label}</div>
        <div>Url : {link}</div>
        <div>Target : {target}</div>
      </div>
      <button onClick={async () => {
        // Récupération de l'_id d'une présentation
        const prezId = { _id };
        await setPrez(prezId);
        setDisplayForm(true)
        setIsForUpdate(true)
        setValue('id', _id);
        setValue('label', label);
        setValue('link', link);
        setValue('target', target);
      }}>Modifier
      </button>

      <button onClick={async () => {
        // Récupération de l'_id d'une présentation
        const prezId = { _id };
        await setPrez(prezId);
        // Suppression d'une présentation 
        deleteNavigation(prezId._id);
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
    // Je créé une nouvelle item dans le menu
    if (!isForUpdate) {
      const newNavigation = await addNavigation(data);
      if (!newNavigation.error) {
        // validate(true);
        setSubmit(true);
        setDisplayForm(false);
        reset();
        console.log('validation ajouté');
        console.log(submit);
      } else {
        alert(newNavigation.message);
      }
    } else {
      const updatedNavigation = await updateNavigation(data, data.id);
      if (!updatedNavigation.error) {
        setSubmit(true);
        setDisplayForm(false);
        setIsForUpdate(false)
        reset();
        console.log('validation updaté');
      } else {
        alert(updatedNavigation.message);
      }
    }
  };


  // MAJ des présentations (front)
  useEffect(() => {
    async function displayNavigations() {
      const data = await getNavigations();
      if (data) {
        setNavigations(data);
        setLoading(false);
      }
    }
    displayNavigations();
    displayNavigations();

  }, [submit]);

  return (
    <section>
      {loading ? <h1>Chargement</h1> : displayNavigations()}
      <button className={displayForm ? 'bo-hide-form' : ''} onClick={() => setDisplayForm(true)}>Ajouter</button>

      <form onSubmit={handleSubmit(onSubmit)} className={displayForm ? '' : 'bo-hide-form'}>
        <input type="hidden" id="id" {...register('id')} />
        <label htmlFor="label">
          <p>Label :</p>
          <input type="text" id="label" {...register('label')} />
        </label>
        <label htmlFor="link">
          <p>Lien :</p>
          <input type="text" id="link" {...register('link')} />
        </label>
        <label htmlFor="target">
          <p>Target :</p>
          <input type="text" id="target" {...register('target')} />
        </label>
        <button type="submit" >Publier</button>
      </form>
    </section>
  );
}

NavigationForm.propTypes = {
  navigation: PropTypes.shape({
    id: PropTypes.string,
    _id: PropTypes.string,
    userId: PropTypes.string,
    label: PropTypes.string,
    link: PropTypes.string,
    target: PropTypes.string,
  }),
  // validate: PropTypes.func,
};

NavigationForm.defaultProps = {
  navigation: null,
  // validate: null,
};
export default NavigationForm;
