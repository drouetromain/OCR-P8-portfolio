/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { updateNavigation, addNavigation } from '../../../lib/common-navigation';
import { getNavigations, deleteNavigation } from '../../../lib/common-navigation';
import '../Bo.css'

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
    <article key={_id} className='bo-article-preview'>
      <div className='bo-drag-and-drop'>
        <span class="material-symbols-outlined">drag_indicator</span>
      </div>
      <div>
        <div id={_id} className='bo-article-navigation'>
          <div><span className='bo-article-label'>Label du lien</span><div className='bo-result-field'>{label}</div></div>
          <div><span className='bo-article-label'>Url</span><div className='bo-result-field'>{link}</div></div>
          <div><span className='bo-article-label'>Target</span><div className='bo-result-field'>{target}</div></div>
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
        }} className='bo-btn'>Modifier
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
        }} className='bo-btn'>Supprimer
        </button>
      </div>
    </article>) : <h1>Il n'y a pas encore de présentation</h1>
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
    <section className='bo-section'>
      <div>
        {loading ? <h1>Chargement</h1> : displayNavigations()}
      </div>
      <div>
        <span className={displayForm ? 'bo-hide-form' : ''} ><button onClick={() => setDisplayForm(true)} className='bo-btn'>Ajouter</button></span>
        <div className={displayForm ? '' : 'bo-hide-form'}>
          <article className='bo-article-preview'>
            <div className='bo-article-form'>
              <form onSubmit={handleSubmit(onSubmit)} className={displayForm ? '' : 'bo-hide-form'}>
                <input type="hidden" id="id" {...register('id')} />
                <label htmlFor="label">
                  <span className='bo-article-label'>Label</span>
                  <input type="text" id="label" {...register('label')} className='bo-input-field'/>
                </label>
                <label htmlFor="link">
                  <span className='bo-article-label'>Lien</span>
                  <input type="text" id="link" {...register('link')} className='bo-input-field'/>
                </label>
                <label htmlFor="target">
                  <span className='bo-article-label'>Target</span>
                  <input type="text" id="target" {...register('target')} className='bo-input-field'/>
                </label>
                <button type="submit" className='bo-btn'>Publier</button>
              </form>
            </div>
          </article>
        </div>
        
      </div>
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
