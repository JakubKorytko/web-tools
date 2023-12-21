import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route,
  useParams
} from "react-router-dom";
import BoxesPage from "./routes/Boxes";
import FilesPage from "./routes/Files";
import LoginPage from "./routes/Login";
import LinksPage from "./routes/Links";
import Authorization from './routes/Authorization';
const settings = require("./settings.json").serverData;


function Link() {
  let { id } = useParams();
  window.location.href=settings.shortLink+id;
  return null;
}

function File() {
  let { id } = useParams();
  window.location.href=settings.fileLink+id;
  return null;
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authorization loginPage={true} path={<LoginPage />} />} />
        <Route path="/files" element={<Authorization path={<FilesPage />} />} />
        <Route path="/boxes" element={<Authorization path={<BoxesPage />} />} />
        <Route path="/links" element={<Authorization path={<LinksPage />} />} />
        <Route path="/link/:id" element={<Link />} />
        <Route path="/file/:id" element={<File />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
