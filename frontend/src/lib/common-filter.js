import axios from 'axios';
import { API_ROUTES } from '../utils/constants';

function formatFilters(filterArray) {
  return filterArray.map((filter) => {
    const newFilter = { ...filter };
    // eslint-disable-next-line no-underscore-dangle
    newFilter.id = newFilter._id;
    return newFilter;
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

export async function getFilters() {
  try {
    const response = await axios({
      method: 'GET',
      url: `${API_ROUTES.FILTERS}`,
    });
    // eslint-disable-next-line array-callback-return
    const filters = formatFilters(response.data);
    return filters;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getFilter(id) {
  try {
    const response = await axios({
      method: 'GET',
      url: `${API_ROUTES.FILTERS}/${id}`,
    });
    const filter = response.data;
    // eslint-disable-next-line no-underscore-dangle
    filter.id = filter._id;
    return filter;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function deleteFilter(id) {
  try {
    await axios.delete(`${API_ROUTES.FILTERS}/${id}`, {
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

export async function addFilter(data) {
  const userId = localStorage.getItem('userId');
  const filter = {
    userId,
    filter: data.filter,
  };
  const bodyFormData = new FormData();
  bodyFormData.append('filter', JSON.stringify(filter));

  try {
    return await axios({
      method: 'post',
      url: `${API_ROUTES.FILTERS}`,
      data: filter,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  } catch (err) {
    console.error(err);
    return { error: true, message: err.message };
  }
}

export async function updateFilter(data, id) {
  const userId = localStorage.getItem('userId');

  let newData;
  const filter = {
    userId,
    filter: data.filter,
  };
  console.log(data.file?.[0]);
  if (data.file?.[0]) {
    newData = new FormData();
    newData.append('filter', JSON.stringify(filter));
    newData.append('image', data.file[0]);
  } else {
    newData = { ...filter };
  }

  try {
    const newFilter = await axios({
      method: 'put',
      url: `${API_ROUTES.FILTERS}/${id}`,
      data: newData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return newFilter;
  } catch (err) {
    console.error(err);
    return { error: true, message: err.message };
  }
}
