import axios from 'axios';
import { API_ROUTES } from '../utils/constants';

function formatCompetences(competenceArray) {
  return competenceArray.map((competence) => {
    const newCompetence = { ...competence };
    // eslint-disable-next-line no-underscore-dangle
    newCompetence.id = newCompetence._id;
    return newCompetence;
  });
}

export function storeInLocalStorage(token, userId) {
  localStorage.setItem('token', token);
  localStorage.setItem('userId', userId);
}

export function getFromLocalStorage(item) {
  return localStorage.getItem(item);
}

export async function getAuthenticatedUser() {
  const defaultReturnObject = { authenticated: false, user: null };
  try {
    const token = getFromLocalStorage('token');
    const userId = getFromLocalStorage('userId');
    if (!token) {
      return defaultReturnObject;
    }
    return { authenticated: true, user: { userId, token } };
  } catch (err) {
    console.error('getAuthenticatedUser, Something Went Wrong', err);
    return defaultReturnObject;
  }
}

export async function getCompetences() {
  try {
    const response = await axios({
      method: 'GET',
      url: `${API_ROUTES.COMPETENCES}`,
    });
    // eslint-disable-next-line array-callback-return
    const competences = formatCompetences(response.data);
    return competences;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getCompetence(id) {
  try {
    const response = await axios({
      method: 'GET',
      url: `${API_ROUTES.COMPETENCES}/${id}`,
    });
    const competence = response.data;
    // eslint-disable-next-line no-underscore-dangle
    competence.id = competence._id;
    return competence;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function deleteCompetence(id) {
  try {
    await axios.delete(`${API_ROUTES.COMPETENCES}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function addCompetence(data) {
  const userId = localStorage.getItem('userId');
  const competence = {
    userId,
    title: data.title,
    description: data.description,
    anchorId: data.anchorId,
    alt: data.alt,
  };
  const bodyFormData = new FormData();
  bodyFormData.append('competence', JSON.stringify(competence));
  bodyFormData.append('image', data.file[0]);
  console.log(bodyFormData);

  try {
    return await axios({
      method: 'post',
      url: `${API_ROUTES.COMPETENCES}`,
      data: bodyFormData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "multipart/form-data"
      },
    });
  } catch (err) {
    console.error(err);
    return { error: true, message: err.message };
  }
}

export async function updateCompetence(data, id) {
  const userId = localStorage.getItem('userId');

  let newData;
  const competence = {
    userId,
    title: data.title,
    description: data.description,
    anchorId: data.anchorId,
    alt: data.alt,
  };
  console.log(data.file?.[0]?.size);
  if (data.file?.[0]) {
    newData = new FormData();
    newData.append('competence', JSON.stringify(competence));
    if (data.file?.[0]?.size > 0) {
      newData.append('image', data.file[0]);
    }
    
    console.log('j\'ai une image: ' + JSON.stringify(data.file[0]) );
    console.log('j\'ai une image: ' + data.file[0] );
    
  } else {
    newData = { ...competence };
    console.log('je n\'ai rien changé');
  }

  try {
    const newCompetence = await axios({
      method: 'put',
      url: `${API_ROUTES.COMPETENCES}/${id}`,
      data: newData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "multipart/form-data"
      },
    });
    return newCompetence;
  } catch (err) {
    console.error(err);
    return { error: true, message: err.message };
  }
}
