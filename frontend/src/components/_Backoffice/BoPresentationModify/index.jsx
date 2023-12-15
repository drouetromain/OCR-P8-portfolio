/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { updatePresentation, addPresentation } from '../../../lib/common';

function PresentationFormModify({ presentation, validate }) {

  const navigate = useNavigate();
  const {
    register, watch, formState, handleSubmit, reset,
  } = useForm({
    defaultValues: useMemo(() => ({
      title: presentation?.title,
      description: presentation?.description,
      anchorId: presentation?.anchorId
    }), [presentation]),
  });
  useEffect(() => {
    reset(presentation);
  }, [presentation]);

  
  const onSubmit = async (data) => {
    // Je créé une nouvelle presentation

    if (!presentation) {
      const newPresentation = await addPresentation(data);
      if (!newPresentation.error) {
        // validate(true);
      } else {
        alert(newPresentation.message);
      }
    } else {
      const updatedPresentation = await updatePresentation(data, data.id);
      if (!updatedPresentation.error) {
        navigate('/');
      } else {
        alert(updatedPresentation.message);
      }
    }
  };



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <button type="submit">Publier</button>
    </form>
  );
}

PresentationFormModify.propTypes = {
  presentation: PropTypes.shape({
    id: PropTypes.string,
    _id: PropTypes.string,
    userId: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    anchorId: PropTypes.number,
  }),
  // validate: PropTypes.func,
};

PresentationFormModify.defaultProps = {
  presentation: null,
  // validate: null,
};
export default PresentationFormModify;
