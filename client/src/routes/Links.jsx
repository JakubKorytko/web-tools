import React, { useEffect, useState } from 'react';

import DeleteModal from 'src/components/DeleteModal';
import Navbar from 'src/components/Navbar';
import ClipboardButton from 'src/components/ClipboardButton';
import Token from 'src/components/Token';

import styles from 'src/routes/Links.style';

import linkImage from 'src/gfx/link.png';

const serverName = process.env.REACT_APP_SERVER_URL;
const isDemo = process.env.REACT_APP_DEMO === 'true';

function LinksPage() {
  const [list, setList] = useState([]);
  const [convertData, setConvertData] = useState({ link: '', src: '' });
  const [disabledForm, setDisabledForm] = useState(false);
  const [delTarget, setDelTarget] = useState(999);

  const refreshData = async () => {
    const data = await fetch(`${serverName}/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Token.value,
      },
      body: JSON.stringify({
        table: 'links',
      }),
    });
    const json = await data.json();
    await setList(json);
  };

  useEffect(refreshData, []);

  const sendData = async () => {
    await setDisabledForm(true);
    if (isDemo) {
      await setDisabledForm(false);
      await setConvertData({ link: '', src: '' });
      return false;
    }
    const res = await fetch(`${serverName}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Token.value,
      },
      body: JSON.stringify({
        link: convertData.link,
        src: convertData.src,
      }),
    });
    await res.text();
    await setConvertData({ link: '', src: '' });
    await refreshData();
    await setDisabledForm(false);
    return true;
  };

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
        table: 'links',
        id: delTarget,
      }),
    });
    await res.text();
    await refreshData();
    await setDisabledForm(false);
    return true;
  };

  const ListItems = list.map((x) => {
    const clickFunc = () => { setDelTarget(x.id); };
    return (
      <li key={x.id} className="list-group-item" style={styles.listItem}>
        <span style={{ wordBreak: 'break-all' }}>{x.src}</span>
        <div style={styles.listItemDiv}>
          <span style={styles.listItemSpan}>
            <ClipboardButton text={`${window.location.origin}/link/${x.link}`} />
            <i
              role="button"
              tabIndex={0}
              aria-label={`Delete ${x.src}`}
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

  const convertFromGrab = (ev) => {
    setConvertData({ link: convertData.link, src: ev.target.value });
  };

  const convertToGrab = (ev) => {
    setConvertData({ src: convertData.src, link: ev.target.value });
  };

  return (
    <div>

      <DeleteModal onDelete={deleteItem} />
      <Navbar title="Link shortener" back />

      <div className="container" style={{ paddingTop: '70px' }}>
        <div className="row">
          <div className="gy-4 col-md-6">
            <div className="card bg-light text-dark">
              <img className="card-img" src={linkImage} alt="Link" />
              <div className="card-img-overlay" style={styles.cardImgOverlay}>
                <div style={styles.formDiv}>
                  Convert from:
                  <input type="text" disabled={disabledForm} value={convertData.src} onChange={convertFromGrab} style={{ width: '100%' }} />
                  <br />
                  To:
                  <input type="text" disabled={disabledForm} value={convertData.link} onChange={convertToGrab} style={{ width: '100%' }} />
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
            </div>
          </div>
          <div className="gy-4 col-md-6">
            <ul className="list-group">
              {ListItems}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinksPage;
