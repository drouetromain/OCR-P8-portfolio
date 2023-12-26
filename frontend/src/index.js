import React from 'react';
// import './index.css';
import {createRoot} from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/';
import Error from './components/Error';
import SignIn from './pages/Login';
import BoPresentationForm from './pages/BO/PresentationForm';
import Presentation from './pages/Presentation/Presentation';

import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
        <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Error />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/admin" element={<BoPresentationForm />} />
              <Route path="/presentation" element={<Presentation />} />
            </Routes>
        </Router>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
