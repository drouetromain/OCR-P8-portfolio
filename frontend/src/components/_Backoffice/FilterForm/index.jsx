/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { updateFilter, addFilter } from '../../../lib/common-filter';
import { getFilters, deleteFilter } from '../../../lib/common-filter';
import '../Bo.css'

function FilterForm({ filter, validate }) {

  // Récupération des présentations
  const [filters, setFilters] = useState(null);
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
      filter: filter?.filter,
    }), [filter]),
  });

  // eslint-disable-next-line max-len

  const displayFilters = () => (filters ? filters.map(({ _id, filter }) =>
    <article key={_id} className='bo-article-preview bo-article-preview-presentation'>
      <div>
        <div id={_id} className='bo-article-presentation'>
          <div><span className='bo-article-label'>Label du filtre</span><div className='bo-result-field'>{filter}</div></div>
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
          setValue('filter', filter);
          displayFilters();
          }} className='bo-btn'>Modifier
        </button>

        <button onClick={async () => {
          // Récupération de l'_id d'un filtre
          const prezId = { _id };
          await setPrez(prezId);
          // Suppression d'un filtre
          deleteFilter(prezId._id);
          displayFilters();
          if (submit === false) {
            setSubmit(true);
          } else {
            setSubmit(false);
          };
          }} className='bo-btn'>Supprimer
        </button>
      </div>      
      
    </article>) : <h1>Il n'y a pas encore de filtre</h1>
  );


  useEffect(() => {
    reset();
    displayFilters();
    displayFilters();
  }, [submit]);

  const onSubmit = async (data) => {
    // Je créé un nouveau filtre
    if (!isForUpdate) {
      const newFilter = await addFilter(data);
      if (!newFilter.error) {
        // validate(true);
        setSubmit(true);
        setDisplayForm(false);
        reset();
        console.log('validation ajouté');
        console.log(submit);
        if (submit === false) {
          setSubmit(true);
        } else {
          setSubmit(false);
        };
      } else {
        alert(newFilter.message);
      }
    } else {
      const updatedFilter = await updateFilter(data, data.id);
      if (!updatedFilter.error) {
        setSubmit(true);
        setDisplayForm(false);
        setIsForUpdate(false)
        reset();
        console.log('validation updaté');
      } else {
        alert(updatedFilter.message);
      }
    }
  };


  // MAJ des présentations (front)
  useEffect(() => {
    async function displayFilters() {
      const data = await getFilters();
      if (data) {
        setFilters(data);
        setLoading(false);
      }
    }
    displayFilters();
    displayFilters();

  }, [submit]);

  return (
    <section className='bo-section'>
      <div>
        {loading ? <h1>Chargement</h1> : displayFilters()}
      </div>
      <div>
        <div className={displayForm ? 'bo-hide-form' : ''}>
          <button onClick={() => setDisplayForm(true)} className='bo-btn-add'><span class="material-symbols-outlined">add_box</span></button>
        </div> 
        <article className={displayForm ? '' : 'bo-hide-form'}>
          <div className='bo-article-form bo-article-preview'>
            <form onSubmit={handleSubmit(onSubmit)} className={displayForm ? '' : 'bo-hide-form'}>
              <input type="hidden" id="id" {...register('id')} />
              <label htmlFor="filter">
              <span className='bo-article-label'>Label du filtre</span>
                <input type="text" id="filter" {...register('filter')} className='bo-input-field'/>
              </label>
              <div className='bo-article-btn'>
                <button onClick={() => { setDisplayForm(false); reset(); }} className='bo-btn'>Annuler</button>
                <button type="submit" className='bo-btn'>Publier</button>
              </div>
            </form>
          </div>
        </article>
      </div>
      
    </section>
  );
}

FilterForm.propTypes = {
  filter: PropTypes.shape({
    id: PropTypes.string,
    _id: PropTypes.string,
    userId: PropTypes.string,
    filter: PropTypes.string,
  }),
  // validate: PropTypes.func,
};

FilterForm.defaultProps = {
  filter: null,
  // validate: null,
};
export default FilterForm;
