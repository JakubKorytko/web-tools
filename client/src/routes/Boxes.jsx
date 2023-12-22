import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import 'bootstrap/dist/js/bootstrap.bundle';
import linkImage from '../gfx/link.png';
import folderImage from '../gfx/folder.png';
import Navbar from '../components/Navbar';

import style from './Boxes.style';

function BoxesPage() {
  return (
    <div>
      <Navbar title="Homepage" back={false} />

      <div className="container" style={{ paddingTop: '70px' }}>
        <div className="row justify-content-center">

          <div className="gy-3 col-lg-4 col-sm-6">
            <a href="/files">
              <div className="card bg-light text-dark">
                <img className="card-img" src={folderImage} alt="Upload" />
                <div className="card-img-overlay">
                  <h2 className="bg-white" style={style.name}>Files manager</h2>
                </div>
              </div>
            </a>
          </div>

          <div className="gy-3 col-lg-4 col-sm-6">
            <a href="/links">
              <div className="card bg-light text-dark">
                <img className="card-img" src={linkImage} alt="Link" />
                <div className="card-img-overlay">
                  <h2 className="bg-white" style={style.name}>Link shortener</h2>
                </div>
              </div>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default BoxesPage;
