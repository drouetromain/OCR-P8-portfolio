import axios from 'axios';
import { API_ROUTES } from '../utils/constants';

function formatPresentations(presentationArray) {
  return presentationArray.map((presentation) => {
    const newPresentation = { ...presentation };
    // eslint-disable-next-line no-underscore-dangle
    newPresentation.id = newPresentation._id;
    return newPresentation;
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

export async function getPresentations() {
  try {
    const response = await axios({
      method: 'GET',
      url: `${API_ROUTES.PRESENTATIONS}`,
    });
    // eslint-disable-next-line array-callback-return
    const presentations = formatPresentations(response.data);
    return presentations;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getPresentation(id) {
  try {
    const response = await axios({
      method: 'GET',
      url: `${API_ROUTES.PRESENTATIONS}/${id}`,
    });
    const presentation = response.data;
    // eslint-disable-next-line no-underscore-dangle
    presentation.id = presentation._id;
    return presentation;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function deletePresentation(id) {
  try {
    await axios.delete(`${API_ROUTES.PRESENTATIONS}/${id}`, {
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

export async function addPresentation(data) {
  const userId = localStorage.getItem('userId');
  const presentation = {
    userId,
    title: data.title,
    description: data.description,
    anchorId: data.anchorId,
  };
  const bodyFormData = new FormData();
  bodyFormData.append('presentation', JSON.stringify(presentation));

  try {
    return await axios({
      method: 'post',
      url: `${API_ROUTES.PRESENTATIONS}`,
      data: presentation,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  } catch (err) {
    console.error(err);
    return { error: true, message: err.message };
  }
}

export async function updatePresentation(data, id) {
  const userId = localStorage.getItem('userId');

  let newData;
  const presentation = {
    userId,
    title: data.title,
    description: data.description,
    anchorId: data.anchorId,
  };
  console.log(data.file?.[0]);
  if (data.file?.[0]) {
    newData = new FormData();
    newData.append('presentation', JSON.stringify(presentation));
    newData.append('image', data.file[0]);
  } else {
    newData = { ...presentation };
  }

  try {
    const newPresentation = await axios({
      method: 'put',
      url: `${API_ROUTES.PRESENTATIONS}/${id}`,
      data: newData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return newPresentation;
  } catch (err) {
    console.error(err);
    return { error: true, message: err.message };
  }
}
