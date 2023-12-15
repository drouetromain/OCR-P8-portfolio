import axios from 'axios';
import { API_ROUTES } from '../utils/constants';

function formatNavigations(navigationArray) {
  return navigationArray.map((navigation) => {
    const newNavigation = { ...navigation };
    // eslint-disable-next-line no-underscore-dangle
    newNavigation.id = newNavigation._id;
    return newNavigation;
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

export async function getNavigations() {
  try {
    const response = await axios({
      method: 'GET',
      url: `${API_ROUTES.NAVIGATIONS}`,
    });
    // eslint-disable-next-line array-callback-return
    const navigations = formatNavigations(response.data);
    return navigations;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getNavigation(id) {
  try {
    const response = await axios({
      method: 'GET',
      url: `${API_ROUTES.NAVIGATIONS}/${id}`,
    });
    const navigation = response.data;
    // eslint-disable-next-line no-underscore-dangle
    navigation.id = navigation._id;
    return navigation;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function deleteNavigation(id) {
  try {
    await axios.delete(`${API_ROUTES.NAVIGATIONS}/${id}`, {
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

export async function addNavigation(data) {
  const userId = localStorage.getItem('userId');
  const navigation = {
    userId,
    label: data.label,
    link: data.link,
    target: data.target,
  };
  const bodyFormData = new FormData();
  bodyFormData.append('navigation', JSON.stringify(navigation));

  try {
    return await axios({
      method: 'post',
      url: `${API_ROUTES.NAVIGATIONS}`,
      data: navigation,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  } catch (err) {
    console.error(err);
    return { error: true, message: err.message };
  }
}

export async function updateNavigation(data, id) {
  const userId = localStorage.getItem('userId');

  let newData;
  const navigation = {
    userId,
    label: data.label,
    link: data.link,
    target: data.target,
  };
  console.log(data.file?.[0]);
  if (data.file?.[0]) {
    newData = new FormData();
    newData.append('navigation', JSON.stringify(navigation));
    newData.append('image', data.file[0]);
  } else {
    newData = { ...navigation };
  }

  try {
    const newNavigation = await axios({
      method: 'put',
      url: `${API_ROUTES.NAVIGATIONS}/${id}`,
      data: newData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return newNavigation;
  } catch (err) {
    console.error(err);
    return { error: true, message: err.message };
  }
}
