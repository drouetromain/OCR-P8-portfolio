import axios from 'axios';
import { API_ROUTES } from '../utils/constants';

function formatSocialmedias(socialmediaArray) {
  return socialmediaArray.map((socialmedia) => {
    const newSocialmedia = { ...socialmedia };
    // eslint-disable-next-line no-underscore-dangle
    newSocialmedia.id = newSocialmedia._id;
    return newSocialmedia;
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

export async function getSocialmedias() {
  try {
    const response = await axios({
      method: 'GET',
      url: `${API_ROUTES.SOCIALMEDIAS}`,
    });
    // eslint-disable-next-line array-callback-return
    const socialmedias = formatSocialmedias(response.data);
    return socialmedias;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getSocialmedia(id) {
  try {
    const response = await axios({
      method: 'GET',
      url: `${API_ROUTES.SOCIALMEDIAS}/${id}`,
    });
    const socialmedia = response.data;
    // eslint-disable-next-line no-underscore-dangle
    socialmedia.id = socialmedia._id;
    return socialmedia;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function deleteSocialmedia(id) {
  try {
    await axios.delete(`${API_ROUTES.SOCIALMEDIAS}/${id}`, {
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

export async function addSocialmedia(data) {
  const userId = localStorage.getItem('userId');
  const socialmedia = {
    userId,
    title: data.title,
    link: data.link,
    anchorId: data.anchorId,
    imageUrl: data.imageUrl,
    alt: data.alt,
  };
  const bodyFormData = new FormData();
  bodyFormData.append('socialmedia', JSON.stringify(socialmedia));
  bodyFormData.append('image', data.file[0]);
  console.log(bodyFormData);

  try {
    return await axios({
      method: 'post',
      url: `${API_ROUTES.SOCIALMEDIAS}`,
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

export async function updateSocialmedia(data, id) {
  const userId = localStorage.getItem('userId');

  let newData;
  const socialmedia = {
    userId,
    title: data.title,
    link: data.link,
    anchorId: data.anchorId,
    imageUrl: data.imageUrl,
    alt: data.alt,
  };
  console.log(data.file?.[0]?.size);
  if (data.file?.[0]) {
    newData = new FormData();
    newData.append('socialmedia', JSON.stringify(socialmedia));
    if (data.file?.[0]?.size > 0) {
      newData.append('image', data.file[0]);
    }
    
    console.log('j\'ai une image: ' + JSON.stringify(data.file[0]) );
    console.log('j\'ai une image: ' + data.file[0] );
    
  } else {
    newData = { ...socialmedia };
    console.log('je n\'ai rien changé');
  }

  try {
    const newSocialmedia = await axios({
      method: 'put',
      url: `${API_ROUTES.SOCIALMEDIAS}/${id}`,
      data: newData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "multipart/form-data"
      },
    });
    return newSocialmedia;
  } catch (err) {
    console.error(err);
    return { error: true, message: err.message };
  }
}
