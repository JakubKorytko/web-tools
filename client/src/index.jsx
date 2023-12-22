import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter, Route, Routes, useParams,
} from 'react-router-dom';

import BoxesPage from './routes/Boxes';
import FilesPage from './routes/Files';
import LoginPage from './routes/Login';
import LinksPage from './routes/Links';
import Authorization from './routes/Authorization';

const settings = require('./settings.json').serverData;

function Url() {
  const { id } = useParams();
  const url = `${settings.shortLink}${id}`;
  window.location.href = url || '/';
  return null;
}

function File() {
  const { id } = useParams();
  const url = `${settings.fileLink}${id}`;
  window.location.href = url || '/';
  return null;
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authorization loginPage path={<LoginPage />} />} />
        <Route path="/files" element={<Authorization path={<FilesPage />} />} />
        <Route path="/boxes" element={<Authorization path={<BoxesPage />} />} />
        <Route path="/links" element={<Authorization path={<LinksPage />} />} />
        <Route path="/link/:id" element={<Url />} />
        <Route path="/file/:id" element={<File />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
