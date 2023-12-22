import React from 'react';

import Navbar from 'src/components/Navbar';

import style from 'src/routes/Boxes.style';

import linkImage from 'src/gfx/link.png';
import folderImage from 'src/gfx/folder.png';

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
