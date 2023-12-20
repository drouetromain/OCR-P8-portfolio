import axios from 'axios';
import { API_ROUTES } from '../utils/constants';

function formatPortfolios(portfolioArray) {
  return portfolioArray.map((portfolio) => {
    const newPortfolio = { ...portfolio };
    // eslint-disable-next-line no-underscore-dangle
    newPortfolio.id = newPortfolio._id;
    return newPortfolio;
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

export async function getPortfolios() {
  try {
    const response = await axios({
      method: 'GET',
      url: `${API_ROUTES.PORTFOLIOS}`,
    });
    // eslint-disable-next-line array-callback-return
    const portfolios = formatPortfolios(response.data);
    return portfolios;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getPortfolio(id) {
  try {
    const response = await axios({
      method: 'GET',
      url: `${API_ROUTES.PORTFOLIOS}/${id}`,
    });
    const portfolio = response.data;
    // eslint-disable-next-line no-underscore-dangle
    portfolio.id = portfolio._id;
    return portfolio;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function deletePortfolio(id) {
  try {
    await axios.delete(`${API_ROUTES.PORTFOLIOS}/${id}`, {
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

export async function addPortfolio(data) {
  const userId = localStorage.getItem('userId');
  const portfolio = {
    userId,
    title: data.title,
    description: data.description,
    anchorId: data.anchorId,
    alt: data.alt,
    filters: data.filters,
    link: data.link,
  };
  const bodyFormData = new FormData();
  bodyFormData.append('portfolio', JSON.stringify(portfolio));
  bodyFormData.append('image', data.file[0]);
  console.log(bodyFormData);

  try {
    return await axios({
      method: 'post',
      url: `${API_ROUTES.PORTFOLIOS}`,
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

export async function updatePortfolio(data, id) {
  const userId = localStorage.getItem('userId');

  let newData;
  const portfolio = {
    userId,
    title: data.title,
    description: data.description,
    anchorId: data.anchorId,
    alt: data.alt,
    filters: data.filters,
    link: data.link,
  };
  console.log(data.file?.[0]?.size);
  if (data.file?.[0]) {
    newData = new FormData();
    newData.append('portfolio', JSON.stringify(portfolio));
    if (data.file?.[0]?.size > 0) {
      newData.append('image', data.file[0]);
    }
    
    console.log('j\'ai une image: ' + JSON.stringify(data.file[0]) );
    console.log('j\'ai une image: ' + data.file[0] );
    
  } else {
    newData = { ...portfolio };
    console.log('je n\'ai rien changé');
  }

  try {
    const newPortfolio = await axios({
      method: 'put',
      url: `${API_ROUTES.PORTFOLIOS}/${id}`,
      data: newData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "multipart/form-data"
      },
    });
    return newPortfolio;
  } catch (err) {
    console.error(err);
    return { error: true, message: err.message };
  }
}
