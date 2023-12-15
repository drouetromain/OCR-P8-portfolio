/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUser } from '../../lib/customHooks';
import styles from './Presentation.module.css';
import { getPresentation, deletePresentation } from '../../lib/common';
import BoPresentation from '../../components/_Backoffice/BoPresentations';
import BackArrow from '../../components/BackArrow/BackArrow';

function Presentation() {
  const { connectedUser, userLoading } = useUser();
  const [presentation, setPresentation] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    async function getItem() {
      const data = await getPresentation(params.id);
      if (data) {
        setPresentation(data);
      }
    }
    getItem();
  }, [params.id]);

  // // Loader si User non connecté
  // useEffect(() => {
  //   if (!userLoading && connectedUser && presentation?.title) {
  //     console.log(connectedUser.userId);
  //   } else if (!userLoading && !connectedUser && presentation) {
  //     setLoading(false);
  //   }
  // }, [presentation, userLoading]);

  const onDelete = async (e) => {
    if (e.key && e.key !== 'Enter') {
      return;
    }
    // eslint-disable-next-line no-restricted-globals
    const check = confirm('Etes vous sûr de vouloir supprimer cette présentation ?');
    if (check) {
      const del = await deletePresentation(presentation.id);
      if (del) {
        setPresentation((oldValue) => ({ ...oldValue, delete: true }));
      }
    }
  };

  const loadingContent = (<h1>Chargement ...</h1>);

  const presentationContent = !loading && !presentation.delete ? (
    <div>
      <div className={styles.Presentation}>
        <div className={styles.PresentationContent}>
          {presentation?.userId === connectedUser?.userId ? (
            <div className={styles.Owner}>
              <p>Vous avez publié cet ouvrage, vous pouvez le :</p>
              <p>
                <Link to={`/livre/modifier/${presentation.id}`}>modifier</Link>
                {' '}
                <span tabIndex={0} role="button" onKeyUp={onDelete} onClick={onDelete}>supprimer</span>
                {' '}
              </p>
            </div>
          ) : null}
          <BoPresentation presentation={presentation} />
        </div>
      </div>
      <hr />
    </div>
  ) : null;
  const deletedContent = presentation?.delete ? (
    <div className={styles.Deleted}>
      <h1>{presentation.title}</h1>
      <p>a bien été supprimé</p>
      <Link to="/">
        <button type="button">{'Retour à l\'accueil'}</button>
      </Link>
    </div>
  ) : null;

  return (
    <div className="content-container">
      <BackArrow />
      {loading ? loadingContent : null}
      <div className={styles.PresentationContainer}>
        {presentationContent}
      </div>
      {presentation?.delete ? deletedContent : null}

    </div>
  );
}
export default Presentation;
