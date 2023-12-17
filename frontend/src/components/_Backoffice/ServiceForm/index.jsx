/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { updateService, addService } from '../../../lib/common-service';
import { getServices, deleteService } from '../../../lib/common-service';
import '../Bo.css'

function ServiceForm({ service, validate }) {

  // Récupération des présentations
  const [services, setServices] = useState(null);
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
      title: service?.title,
      description: service?.description,
      titleTag: service?.titleTag,
      tag: service?.tag,
      anchorId: service?.anchorId
    }), [service]),
  });

  // eslint-disable-next-line max-len

  const displayServices = () => (services ? services.map(({ _id, title, description, titleTag, tag, anchorId }) =>
    <article key={_id} className='bo-article-preview bo-article-preview-navigation'>
      <div className='bo-drag-and-drop'>
        <span class="material-symbols-outlined">drag_indicator</span>
      </div>
      <div>
        <div>
          <div id={_id} className='bo-article-navigation'>
            <div><span className='bo-article-label'>Titre</span><div className='bo-result-field'>{title}</div></div>
            <div><span className='bo-article-label'>Description</span><div className='bo-result-field'>{description}</div></div>
            <div><span className='bo-article-label'>Titre des Tags</span><div className='bo-result-field'>{titleTag}</div></div>
            <div><span className='bo-article-label'>Tags</span><div className='bo-result-field'>{tag}</div></div>
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
            setValue('titleTag', titleTag);
            setValue('tag', tag);
            setValue('anchorId', anchorId);
            }} className='bo-btn'>Modifier
          </button>
          <button onClick={async () => {
            // Récupération de l'_id d'un service
            const prezId = { _id };
            await setPrez(prezId);
            // Suppression d'un service 
            deleteService(prezId._id);
            if (submit === false) {
              setSubmit(true);
            } else {
              setSubmit(false);
            };
            }} className='bo-btn'>Supprimer
          </button>
        </div>
        
      </div>
    </article>) : <h1>Il n'y a pas encore de service</h1>
  );


  useEffect(() => {
    reset();
  }, [submit]);

  const onSubmit = async (data) => {
    // Je créé une nouveau service
    if (!isForUpdate) {
      const newService = await addService(data);
      if (!newService.error) {
        // validate(true);
        setSubmit(true);
        setDisplayForm(false);
        reset();
        console.log('validation ajouté');
        console.log(submit);
      } else {
        alert(newService.message);
      }
    } else {
      const updatedService = await updateService(data, data.id);
      if (!updatedService.error) {
        setSubmit(true);
        setDisplayForm(false);
        setIsForUpdate(false)
        reset();
        console.log('validation updaté');
      } else {
        alert(updatedService.message);
      }
    }
  };


  // MAJ des services (front)
  useEffect(() => {
    async function displayServices() {
      const data = await getServices();
      if (data) {
        setServices(data);
        setLoading(false);
      }
    }
    displayServices();
    displayServices();

  }, [submit]);

  return (
    <section className='bo-section'>
      <div>
        {loading ? <h1>Chargement</h1> : displayServices()}
      </div>
      <div>
        <div className={displayForm ? 'bo-hide-form' : ''}>
          <button onClick={() => setDisplayForm(true)} className='bo-btn-add'><span class="material-symbols-outlined">add_box</span></button>
        </div> 
        <div className={displayForm ? '' : 'bo-hide-form'}>
          <article className='bo-article-preview'>
            <div className='bo-article-form'>
              <form onSubmit={handleSubmit(onSubmit)} className={displayForm ? '' : 'bo-hide-form'}>
                <input type="hidden" id="id" {...register('id')} />
                <label htmlFor="titre">
                  <span className='bo-article-label'>Titre</span>
                  <input type="text" id="title" {...register('title')} className='bo-input-field'/>
                </label>
                <label htmlFor="description">
                  <span className='bo-article-label'>Description</span>
                  <input type="text" id="description" {...register('description')} className='bo-input-field'/>
                </label>
                <label htmlFor="titleTag">
                  <span className='bo-article-label'>Titre des Tags</span>
                  <input type="text" id="titleTag" {...register('titleTag')} className='bo-input-field'/>
                </label>
                <label htmlFor="tag">
                  <span className='bo-article-label'>Tags</span>
                  <input type="text" id="tag" {...register('tag')} className='bo-input-field'/>
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
        
      </div>
    </section>
  );
}

ServiceForm.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.string,
    _id: PropTypes.string,
    userId: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    titleTag: PropTypes.string,
    tag: PropTypes.string,
    AnchorId: PropTypes.string,
  }),
  // validate: PropTypes.func,
};

ServiceForm.defaultProps = {
  service: null,
  // validate: null,
};
export default ServiceForm;
