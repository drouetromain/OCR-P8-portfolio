import axios from 'axios';
import { API_ROUTES } from '../utils/constants';

function formatHeros(heroArray) {
  return heroArray.map((hero) => {
    const newHero = { ...hero };
    // eslint-disable-next-line no-underscore-dangle
    newHero.id = newHero._id;
    return newHero;
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

export async function getHeros() {
  try {
    const response = await axios({
      method: 'GET',
      url: `${API_ROUTES.HEROS}`,
    });
    // eslint-disable-next-line array-callback-return
    const heros = formatHeros(response.data);
    return heros;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getHero(id) {
  try {
    const response = await axios({
      method: 'GET',
      url: `${API_ROUTES.HEROS}/${id}`,
    });
    const hero = response.data;
    // eslint-disable-next-line no-underscore-dangle
    hero.id = hero._id;
    return hero;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function deleteHero(id) {
  try {
    await axios.delete(`${API_ROUTES.HEROS}/${id}`, {
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

export async function addHero(data) {
  const userId = localStorage.getItem('userId');
  const hero = {
    userId,
    title: data.title,
    subTitle: data.subTitle,
    anchorId: data.anchorId,
    alt: data.alt,
  };
  const bodyFormData = new FormData();
  bodyFormData.append('hero', JSON.stringify(hero));
  bodyFormData.append('image', data.file[0]);
  console.log(bodyFormData);

  try {
    return await axios({
      method: 'post',
      url: `${API_ROUTES.HEROS}`,
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

export async function updateHero(data, id) {
  const userId = localStorage.getItem('userId');

  let newData;
  const hero = {
    userId,
    title: data.title,
    subTitle: data.subTitle,
    anchorId: data.anchorId,
    alt: data.alt,
  };
  console.log(data.file?.[0]?.size);
  if (data.file?.[0]) {
    newData = new FormData();
    newData.append('hero', JSON.stringify(hero));
    if (data.file?.[0]?.size > 0) {
      newData.append('image', data.file[0]);
    }
    
    console.log('j\'ai une image: ' + JSON.stringify(data.file[0]) );
    console.log('j\'ai une image: ' + data.file[0] );
    
  } else {
    newData = { ...hero };
    console.log('je n\'ai rien changé');
  }

  try {
    const newHero = await axios({
      method: 'put',
      url: `${API_ROUTES.HEROS}/${id}`,
      data: newData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "multipart/form-data"
      },
    });
    return newHero;
  } catch (err) {
    console.error(err);
    return { error: true, message: err.message };
  }
}
