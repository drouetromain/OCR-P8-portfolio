/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { updatePortfolio, addPortfolio } from '../../../lib/common-portfolio';
import { getPortfolios, deletePortfolio } from '../../../lib/common-portfolio';
import { getFilters } from '../../../lib/common-filter';
import { useFilePreview } from '../../../lib/customHooks';
import '../Bo.css'

function PortfolioForm({ portfolio, validate }) {

  // Récupération des compétences
  const [portfolios, setPortfolios] = useState(null);
  const [filters, setFilters] = useState(null);
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
      title: portfolio?.title,
      description: portfolio?.description,
      anchorId: portfolio?.anchorId,
      alt: portfolio?.alt
    }), [portfolio]),
  });
  const file = watch([]);
  console.log('file: ' + JSON.stringify(file));

  const [filePreview] = useFilePreview(file);

  // eslint-disable-next-line max-len

  const displayPortfolios = () => (portfolios ? portfolios.map(({ _id, title, description, anchorId, imageUrl, alt, filters, link}) =>
    <article key={_id} className='bo-article-preview'>
      <div className='bo-drag-and-drop'>
        <span class="material-symbols-outlined">drag_indicator</span>
      </div>
      <div>
        <div id={_id} className='bo-article-competence'>
          
          <div className='bo-article-competence-details'>
            <div><span className='bo-article-label'>Titre</span> <div className='bo-result-field'>{title}</div></div>
            <div><span className='bo-article-label'>Description</span> <div className='bo-result-field'>{description}</div></div>
            <div><span className='bo-article-label'>Ancre</span> <div className='bo-result-field'>{anchorId}</div></div>
            <div><span className='bo-article-label'>Filtres</span> <div className='bo-result-field'>{filters}</div></div>
          </div>
          <div className='bo-article-competence-preview'> 
            <div><img src={imageUrl} className='bo-competence-img-preview'/></div>
            <div><span className='bo-article-label'>Alt de l'image </span><div className='bo-result-field'>{alt}</div></div>
            <div><span className='bo-article-label'>lien de l'image </span><div className='bo-result-field'>{link}</div></div>
          </div>
        </div>
        <div className='bo-article-btn'>
          <button onClick={async () => {
            // Récupération de l'_id d'une compétence
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
            setValue('title', title);
            setValue('description', description);
            setValue('filters', filters);
            setValue('anchorId', anchorId);
            setValue('file', imageUrl );
            setValue('alt', alt);
            setValue('link', link);
            
            console.log('currentImgUrl:' + currentImgUrl);
            console.log('imageUrl:' + imageUrl);
          }} className='bo-btn'>Modifier
          </button>

          <button onClick={async () => {
            // Récupération de l'_id d'une compétence
            const objectId = { _id };
            await setPrez(objectId);
            // Suppression d'une compétence
            deletePortfolio(objectId._id);
            if (submit === false) {
              setSubmit(true);
            } else {
              setSubmit(false);
            };
          }} className='bo-btn'>Supprimer
          </button>
        </div>
      </div>
    </article>) : <h1>Il n'y a pas encore de compétence</h1>
  );


  useEffect(() => {
    reset();
  }, [submit]);
  
  const onSubmit = async (data) => {
    if (!data.file[0]) {
      alert('Vous devez ajouter une image');
    }
    // Je créé un nouveau portfolio
    if (!isForUpdate) {
      const newPortfolio = await addPortfolio(data);
      if (!newPortfolio.error) {
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
        alert(newPortfolio.message);
      }
    } else {
      console.log(JSON.stringify(data));
      
      const updatedPortfolio = await updatePortfolio(data, data.id);
      if (!updatedPortfolio.error) {
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
        alert(updatedPortfolio.message);
      }
    }
  };


  // MAJ des portfolios (front)
  useEffect(() => {
    async function displayPortfolios() {
      const data = await getPortfolios();
      if (data) {
        setPortfolios(data);
        setLoading(false);
        console.log('data: ' + JSON.stringify(data));
      }
    }
    displayPortfolios();
    displayPortfolios();

  }, [submit]);

  // Récupération des filtres
  useEffect(() => {
    async function displayFilters() {
      const dataFilters = await getFilters();
      if (dataFilters) {
        setFilters(dataFilters);
        console.log('dataFilters: ' + JSON.stringify(dataFilters));
      }
    }
    displayFilters()
    displayFilters()

  }, [submit, isForUpdate]);
  console.log('filters: ' + JSON.stringify(filters));


  return (
    <section className='bo-section'>
      <div>
        {loading ? <h1>Chargement</h1> : displayPortfolios()}
      </div>
      <div>
        <div className={displayForm ? 'bo-hide-form' : ''}>
          <button onClick={() => setDisplayForm(true)} className='bo-btn-add'><span class="material-symbols-outlined">add_box</span></button>
        </div> 
        <article className={displayForm ? '' : 'bo-hide-form'}>
          <div className='bo-article-form bo-article-preview'>
            <form onSubmit={handleSubmit(onSubmit)} >
              <input type="hidden" id="id" {...register('id')}/>
              <label htmlFor="title">
                <span className='bo-article-label'>Titre</span>
                <input type="text" id="title" {...register('title')} className='bo-input-field'/>
              </label>
              <label htmlFor="description">
                <span className='bo-article-label'>Description</span>
                <input type="text" id="description" {...register('description')} className='bo-input-field'/>
              </label>
              <label htmlFor="description">
                <span className='bo-article-label'>Filtres</span>
                <input type="text" id="filters" {...register('filters')} className='bo-input-field'/>
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
              <label htmlFor="alt">
                <span className='bo-article-label'>Lien de l'image</span>
                <input type="text" id="link" {...register('link')} className='bo-input-field'/>
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

PortfolioForm.propTypes = {
  portfolio: PropTypes.shape({
    id: PropTypes.string,
    _id: PropTypes.string,
    userId: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    anchorId: PropTypes.string,
    imageUrl: PropTypes.string,
    link: PropTypes.string,
    alt: PropTypes.string,
  }),
  // validate: PropTypes.func,
};

PortfolioForm.defaultProps = {
  portfolio: null,
  // validate: null,
};
export default PortfolioForm;
