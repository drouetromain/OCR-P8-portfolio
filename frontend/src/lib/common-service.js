import axios from 'axios';
import { API_ROUTES } from '../utils/constants';

function formatServices(serviceArray) {
  return serviceArray.map((service) => {
    const newService = { ...service };
    // eslint-disable-next-line no-underscore-dangle
    newService.id = newService._id;
    return newService;
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

export async function getServices() {
  try {
    const response = await axios({
      method: 'GET',
      url: `${API_ROUTES.SERVICES}`,
    });
    // eslint-disable-next-line array-callback-return
    const services = formatServices(response.data);
    return services;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getService(id) {
  try {
    const response = await axios({
      method: 'GET',
      url: `${API_ROUTES.SERVICES}/${id}`,
    });
    const service = response.data;
    // eslint-disable-next-line no-underscore-dangle
    service.id = service._id;
    return service;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function deleteService(id) {
  try {
    await axios.delete(`${API_ROUTES.SERVICES}/${id}`, {
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

export async function addService(data) {
  const userId = localStorage.getItem('userId');
  const service = {
    userId,
    title: data.title,
    description: data.description,
    titleTag: data.titleTag,
    tag: data.tag,
    anchorId: data.anchorId,
  };
  const bodyFormData = new FormData();
  bodyFormData.append('service', JSON.stringify(service));

  try {
    return await axios({
      method: 'post',
      url: `${API_ROUTES.SERVICES}`,
      data: service,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  } catch (err) {
    console.error(err);
    return { error: true, message: err.message };
  }
}

export async function updateService(data, id) {
  const userId = localStorage.getItem('userId');

  let newData;
  const service = {
    userId,
    title: data.title,
    description: data.description,
    titleTag: data.titleTag,
    tag: data.tag,
    anchorId: data.anchorId,
  };
  console.log(data.file?.[0]);
  if (data.file?.[0]) {
    newData = new FormData();
    newData.append('service', JSON.stringify(service));
    newData.append('image', data.file[0]);
  } else {
    newData = { ...service };
  }

  try {
    const newService = await axios({
      method: 'put',
      url: `${API_ROUTES.SERVICES}/${id}`,
      data: newData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return newService;
  } catch (err) {
    console.error(err);
    return { error: true, message: err.message };
  }
}
