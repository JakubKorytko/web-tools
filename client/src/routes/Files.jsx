import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { FileDrop } from 'react-file-drop';

import uploadImage from '../gfx/upload.png';
import Alert from '../components/Alert';
import DeleteModal from '../components/DeleteModal';
import Navbar from '../components/Navbar';
import ClipboardButton from '../components/ClipboardButton';
import './Files.style.css';
import Token from '../components/Token';

import styles from './Files.style';

const settings = require('../settings.json');

const serverName = settings.serverData.name;
const isDemo = settings.demo;

function FilesPage() {
  const [alertDisplay, setAlertDisplay] = useState(false);
  const [list, setList] = useState([]);
  const [convertData, setConvertData] = useState({ link: '', src: undefined });
  const [disabledForm, setDisabledForm] = useState(false);
  const [delTarget, setDelTarget] = useState(999);
  const [fileTransfered, setFileTransfered] = useState(false);

  const refreshData = async () => {
    const data = await fetch(`${serverName}/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Token.value,
      },
      body: JSON.stringify({
        table: 'files',
      }),
    });
    const json = await data.json();
    await setList(json);
  };

  useEffect(refreshData, []);

  const deleteItem = async () => {
    await setDisabledForm(true);
    if (isDemo) {
      await setDisabledForm(false);
      return false;
    }
    const res = await fetch(`${serverName}/del`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Token.value,
      },
      body: JSON.stringify({
        table: 'files',
        id: delTarget,
      }),
    });
    await res.text();
    await refreshData();
    await setDisabledForm(false);
    return true;
  };

  const transferFile = (x) => {
    setConvertData({ link: '', file: x[0] });
    setFileTransfered(true);
  };

  const alert = async () => {
    await setAlertDisplay(true);
    // setTimeout(() => { setAlertDisplay (false) }, 2000 )
  };

  const sendData = async () => {
    if (isDemo) {
      await alert();
      await setDisabledForm(false);
      await setConvertData({ link: '', src: '' });
      await setFileTransfered(false);
      return false;
    }
    const form = new FormData();
    form.append('file', convertData.file);
    form.append('link', convertData.link);
    await setDisabledForm(true);
    const res = await fetch(`${serverName}/addFile`, {
      method: 'POST',
      headers: {
        Authorization: Token.value,
      },
      body: form,
    });
    await res.text();

    await setConvertData({ link: '', src: '' });
    await refreshData();
    await setDisabledForm(false);
    await setFileTransfered(false);
    return true;
  };

  const ListItems = list.map((x) => {
    const clickFunc = () => { setDelTarget(x.id); };
    return (
      <li key={x.id} className="list-group-item" style={styles.listItem}>
        <span style={{ wordBreak: 'break-all' }}>{x.src}</span>
        <div style={styles.listItemDiv}>
          <span style={styles.listItemSpan}>
            <ClipboardButton text={`${window.location.origin}/file/${x.link}`} />
            <i
              aria-label={`Delete ${x.src}`}
              role="button"
              tabIndex={0}
              className="bi bi-trash-fill"
              data-bs-toggle="modal"
              onClick={clickFunc}
              onKeyDown={clickFunc}
              data-bs-target="#deleteModal"
            />
          </span>
        </div>
      </li>
    );
  });

  const transferEvent = (ev) => {
    const { target } = ev;
    transferFile(target.files);
    target.value = null;
  };

  const linkGrab = (ev) => {
    setConvertData({ link: ev.target.value, file: convertData.file });
  };

  return (
    <main>
      <DeleteModal onDelete={deleteItem} />
      <Navbar title="File manager" back />

      <div className="container" style={{ paddingTop: '70px' }}>
        <div className="row">
          <div className="gy-4 col-md-6">
            <div className="card bg-light text-dark">
              <img className="card-img" src={uploadImage} alt="Upload" />

              <div
                className="card-img-overlay"
                style={styles.cardImgOverlay(fileTransfered)}
              >
                <div style={styles.cardImgOverlayDiv}>
                  Link:
                  <input type="text" disabled={disabledForm} value={convertData.link} onChange={linkGrab} style={{ width: '100%' }} />
                  <br />
                  <button
                    onClick={sendData}
                    disabled={disabledForm}
                    style={{ marginTop: '10px' }}
                    type="button"
                  >
                    Convert
                  </button>
                </div>
              </div>

              <FileDrop onDrop={transferFile}>
                <div
                  className="card-img-overlay"
                  style={styles.cardImgOverlay(!fileTransfered)}
                >

                  <fieldset id="zone" style={styles.zone}>

                    <div className="no-file">
                      <legend>Drop a file inside&hellip;</legend>
                      <input onChange={transferEvent} style={{ textAlignLast: 'center' }} type="file" />
                      <p>
                        Or click here to
                        <em>Browse</em>
                        ..
                      </p>
                    </div>

                    <div className="file-hold">
                      <legend>Drop here!</legend>
                    </div>

                    <div className="file-over">
                      <legend>Drop now!</legend>
                    </div>

                    <p style={styles.fieldsetParagraph} />

                  </fieldset>
                </div>
              </FileDrop>
            </div>
          </div>
          <div className="gy-4 col-md-6">
            <ul className="list-group">
              {ListItems}
            </ul>
          </div>
        </div>
      </div>
      {alertDisplay && (
      <Alert variant="danger">
        You can&apos;t upload files in demo mode!
      </Alert>
      )}
    </main>
  );
}

export default FilesPage;
