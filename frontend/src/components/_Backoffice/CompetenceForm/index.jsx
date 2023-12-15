/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { updateCompetence, addCompetence } from '../../../lib/common-competence';
import { getCompetences, deleteCompetence } from '../../../lib/common-competence';
import { useFilePreview } from '../../../lib/customHooks';
import addFileIMG from '../../../images/add_file.png';
import '../Bo.css'

function CompetenceForm({ competence, validate }) {

  // Récupération des compétences
  const [competences, setCompetences] = useState(null);
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
      title: competence?.title,
      description: competence?.description,
      anchorId: competence?.anchorId,
      alt: competence?.alt
    }), [competence]),
  });
  const file = watch([]);
  console.log('file: ' + JSON.stringify(file));

  const [filePreview] = useFilePreview(file);

  // eslint-disable-next-line max-len

  const displayCompetences = () => (competences ? competences.map(({ _id, title, description, anchorId, imageUrl, alt}) =>
    <div key={_id}>
      <div id={_id}>
        <div>Titre : {title}</div>
        <div>Description : {description}</div>
        <div>Ancre : {anchorId}</div>
        <div>Image : <img src={imageUrl} className='bo-competence-img-preview'/></div>
        <div>Alt : {alt}</div>
      </div>
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
        setValue('anchorId', anchorId);
        setValue('file', imageUrl );
        setValue('alt', alt);
        
        console.log('currentImgUrl:' + currentImgUrl);
        console.log('imageUrl:' + imageUrl);
      }}>Modifier
      </button>

      <button onClick={async () => {
        // Récupération de l'_id d'une compétence
        const objectId = { _id };
        await setPrez(objectId);
        // Suppression d'une compétence
        deleteCompetence(objectId._id);
        if (submit === false) {
          setSubmit(true);
        } else {
          setSubmit(false);
        };
      }}>Supprimer
      </button>
    </div>) : <h1>Il n'y a pas encore de compétence</h1>
  );


  useEffect(() => {
    reset();
  }, [submit]);
  
  const onSubmit = async (data) => {
    if (!data.file[0]) {
      alert('Vous devez ajouter une image');
    }
    // Je créé une nouvelle competence
    if (!isForUpdate) {
      const newCompetence = await addCompetence(data);
      if (!newCompetence.error) {
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
        alert(newCompetence.message);
      }
    } else {
      console.log(JSON.stringify(data));
      
      const updatedCompetence = await updateCompetence(data, data.id);
      if (!updatedCompetence.error) {
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
        alert(updatedCompetence.message);
      }
    }
  };


  // MAJ des présentations (front)
  useEffect(() => {
    async function displayCompetences() {
      const data = await getCompetences();
      if (data) {
        setCompetences(data);
        setLoading(false);
        console.log('data: ' + JSON.stringify(data));
      }
    }
    displayCompetences();
    displayCompetences();

  }, [submit]);

  return (
    <section>
      {loading ? <h1>Chargement</h1> : displayCompetences()}
      <button className={displayForm ? 'bo-hide-form' : ''} onClick={() => setDisplayForm(true)}>Ajouter</button>

      <form onSubmit={handleSubmit(onSubmit)} className={displayForm ? '' : 'bo-hide-form'}>
        <input type="hidden" id="id" {...register('id')} />
        <label htmlFor="title">
          <p>Titre :</p>
          <input type="text" id="title" {...register('title')} />
        </label>
        <label htmlFor="description">
          <p>Description</p>
          <input type="text" id="description" {...register('description')} />
        </label>
        <label htmlFor="anchorId">
          <p>Ancre</p>
          <input type="text" id="anchorId" {...register('anchorId')} />
        </label>
        <p>Image</p>
          <div>
            {filePreview || currentImgUrl ? (
              <>
                <img src={filePreview ?? currentImgUrl} alt="preview" />
                <p>Modifier</p>
              </>
            ) : (
              <>
                <img src={addFileIMG} alt="Add file" />
                <p>Ajouter une image</p>
              </>
            )}

          </div>
        <label htmlFor="file">
          <input {...register('file')} type="file" id="file" name='file' />
        </label>
        <label htmlFor="alt">
          <p>Balise Alt :</p>
          <input type="text" id="alt" {...register('alt')} />
        </label>
        <button type="submit">Publier</button>
      </form>
    </section>
  );
}

CompetenceForm.propTypes = {
  competence: PropTypes.shape({
    id: PropTypes.string,
    _id: PropTypes.string,
    userId: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    anchorId: PropTypes.string,
    imageUrl: PropTypes.string,
    alt: PropTypes.string,
  }),
  // validate: PropTypes.func,
};

CompetenceForm.defaultProps = {
  competence: null,
  // validate: null,
};
export default CompetenceForm;
