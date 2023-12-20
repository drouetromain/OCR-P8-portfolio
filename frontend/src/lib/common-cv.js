import axios from 'axios';
import { API_ROUTES } from '../utils/constants';

function formatCvs(cvArray) {
  return cvArray.map((cv) => {
    const newCv = { ...cv };
    // eslint-disable-next-line no-underscore-dangle
    newCv.id = newCv._id;
    return newCv;
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

export async function getCvs() {
  try {
    const response = await axios({
      method: 'GET',
      url: `${API_ROUTES.CVS}`,
    });
    // eslint-disable-next-line array-callback-return
    const cvs = formatCvs(response.data);
    return cvs;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getCv(id) {
  try {
    const response = await axios({
      method: 'GET',
      url: `${API_ROUTES.CVS}/${id}`,
    });
    const cv = response.data;
    // eslint-disable-next-line no-underscore-dangle
    cv.id = cv._id;
    return cv;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function deleteCv(id) {
  try {
    await axios.delete(`${API_ROUTES.CVS}/${id}`, {
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

export async function addCv(data) {
  const userId = localStorage.getItem('userId');
  const cv = {
    userId,
    title: data.title,
    description: data.description,
    linkLabel: data.linkLabel,
    documentUrl: data.documentUrl,
    anchorId: data.anchorId,
  };
  const bodyFormData = new FormData();
  bodyFormData.append('cv', JSON.stringify(cv));

  try {
    return await axios({
      method: 'post',
      url: `${API_ROUTES.CVS}`,
      data: cv,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  } catch (err) {
    console.error(err);
    return { error: true, message: err.message };
  }
}

export async function updateCv(data, id) {
  const userId = localStorage.getItem('userId');

  let newData;
  const cv = {
    userId,
    title: data.title,
    description: data.description,
    linkLabel: data.linkLabel,
    documentUrl: data.documentUrl,
    anchorId: data.anchorId,
  };
  console.log(data.file?.[0]);
  if (data.file?.[0]) {
    newData = new FormData();
    newData.append('cv', JSON.stringify(cv));
    newData.append('image', data.file[0]);
  } else {
    newData = { ...cv };
  }

  try {
    const newCv = await axios({
      method: 'put',
      url: `${API_ROUTES.CVS}/${id}`,
      data: newData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return newCv;
  } catch (err) {
    console.error(err);
    return { error: true, message: err.message };
  }
}
