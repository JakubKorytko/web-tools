import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Route, Routes, useParams,
} from 'react-router-dom';

import Authorization from 'src/routes/Authorization';
import BoxesPage from 'src/routes/Boxes';
import FilesPage from 'src/routes/Files';
import LoginPage from 'src/routes/Login';
import LinksPage from 'src/routes/Links';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'src/index.css';

const settings = require('src/settings.json').serverData;

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
