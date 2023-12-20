const API_URL = 'http://localhost:4000';
export const API_ROUTES = {
  SIGN_UP: `${API_URL}/api/auth/signup`,
  SIGN_IN: `${API_URL}/api/auth/login`,
  // BOOKS: `${API_URL}/api/books`,
  NAVIGATIONS: `${API_URL}/api/navigations`,
  HEROS: `${API_URL}/api/heros`,
  PRESENTATIONS: `${API_URL}/api/presentations`,
  COMPETENCES: `${API_URL}/api/competences`,
  SERVICES: `${API_URL}/api/services`,
  SOCIALMEDIAS: `${API_URL}/api/socialmedias`,
  CVS: `${API_URL}/api/CVs`,
};

export const APP_ROUTES = {
  // SIGN_UP: '/Inscription',
  // SIGN_IN: '/Connexion',
  // ADD_BOOK: '/Ajouter',
  // BOOK: '/livre/:id',
  NAVIGATIONS: '/formulaire-presentation',
  HEROS: '/formulaire-presentation',
  PRESENTATIONS: '/formulaire-presentation',
  COMPETENCES: '/formulaire-presentation',
  SERVICES: '/formulaire-presentation',
  CVS: '/formulaire-presentation',
  SOCIALMEDIAS: '/formulaire-presentation',
  // UPDATE_BOOK: 'livre/modifier/:id',
};
