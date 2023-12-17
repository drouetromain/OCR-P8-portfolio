const API_URL = 'http://localhost:4000';
export const API_ROUTES = {
  SIGN_UP: `${API_URL}/api/auth/signup`,
  SIGN_IN: `${API_URL}/api/auth/login`,
  BOOKS: `${API_URL}/api/books`,
  PRESENTATIONS: `${API_URL}/api/presentations`,
  NAVIGATIONS: `${API_URL}/api/navigations`,
  SERVICES: `${API_URL}/api/services`,
  COMPETENCES: `${API_URL}/api/competences`,
};

export const APP_ROUTES = {
  SIGN_UP: '/Inscription',
  SIGN_IN: '/Connexion',
  ADD_BOOK: '/Ajouter',
  BOOK: '/livre/:id',
  PRESENTATIONS: '/formulaire-presentation',
  NAVIGATIONS: '/formulaire-presentation',
  COMPETENCES: '/formulaire-presentation',
  SERVICES: '/formulaire-presentation',
  UPDATE_BOOK: 'livre/modifier/:id',
};
