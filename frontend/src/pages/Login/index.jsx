import React, { useState } from 'react';
import axios from 'axios';
import * as PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { API_ROUTES, APP_ROUTES } from '../../utils/constants';
import { useUser } from '../../lib/customHooks';
import { storeInLocalStorage } from '../../lib/common';
import '../../components/_Backoffice/Bo.css'

function SignIn({ setUser }) {
  const navigate = useNavigate();
  const { user, authenticated } = useUser();
  if (user || authenticated) {
    navigate(APP_ROUTES.DASHBOARD);
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ error: false, message: '' });
  const signIn = async () => {
    try {
      setIsLoading(true);
      const response = await axios({
        method: 'post',
        url: API_ROUTES.SIGN_IN,
        data: {
          email,
          password,
        },
      });
      if (!response?.data?.token) {
        setNotification({ error: true, message: 'Une erreur est survenue' });
        console.log('Something went wrong during signing in: ', response);
      } else {
        storeInLocalStorage(response.data.token, response.data.userId);
        // setUser(response.data);
        navigate('/admin');
      }
    } catch (err) {
      console.log(err);
      setNotification({ error: true, message: err.message });
      console.log('Some error occured during signing in: ', err);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async () => {
    try {
      setIsLoading(true);
      const response = await axios({
        method: 'POST',
        url: API_ROUTES.SIGN_UP,
        data: {
          email,
          password,
        },
      });
      if (!response?.data) {
        console.log('Something went wrong during signing up: ', response);
        return;
      }
      setNotification({ error: false, message: 'Votre compte a bien été créé, vous pouvez vous connecter' });
    } catch (err) {
      setNotification({ error: true, message: err.message });
      console.log('Some error occured during signing up: ', err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className='bo-connexion-section'>
      <article className='bo-article-connexion'>
        <div className='bo-connexion-h1'>
          <h1 >Connexion</h1>
        </div>
        <div>
          {notification.message.length > 0 && <p>{notification.message}</p>}
        </div>
        <div>
          <label htmlFor={email}>
            <span className='bo-article-label'>Adresse email</span>
            <input
              className='bo-input-field'
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); }}
            />
          </label>
          <label htmlFor="password">
            <span className='bo-article-label'>Mot de passe</span>
            <input
              className='bo-input-field'
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); }}
            />
          </label>
        </div>
        <div className='bo-connexion-btn-block'>
          <div>
            <button
              type="submit"
              className='bo-btn'
              onClick={signIn}
            >
              {isLoading ? <div className="" /> : null}
              <span>
                Se connecter
              </span>
            </button>
          </div>

      </div>
      </article>
    </section>
  );
}

// SignIn.propTypes = {
//   setUser: PropTypes.func.isRequired,
// };
export default SignIn;
