import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import linkImage from "../gfx/link.png";
import DeleteModal from '../components/DeleteModal';
import Navbar from '../components/Navbar';
import ClipboardButton from '../components/ClipboardButton';
import Token from '../components/Token';
const settings = require("../settings.json");
const serverName = settings.serverData.name;
const isDemo = settings.demo;

const LinksPage = () => {

    const [list, setList] = useState([]);
    const [convertData, setConvertData] = useState({ link: "", src: "" });
    const [disabledForm, setDisabledForm] = useState(false);
    const [delTarget, setDelTarget] = useState(999);

    useEffect(() => {
        refreshData();
    }, [])

    const refreshData = async () => {
        const data = await fetch(`${serverName}/get`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Token.value
            },
            body: JSON.stringify({
                table: "links"
            })
        })
        const json = await data.json();
        await setList(json);
    }

    const sendData = async () => {
        await setDisabledForm(true);
        if (isDemo) {
            await setDisabledForm(false);
            await setConvertData({ link: "", src: "" });
            return false;
        }
        const res = await fetch(`${serverName}/add`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Token.value
            },
            body: JSON.stringify({
                link: convertData.link,
                src: convertData.src
            })
        })
        await res.text();
        await setConvertData({ link: "", src: "" });
        await refreshData();
        await setDisabledForm(false);
    }

    const deleteItem = async () => {
        await setDisabledForm(true);
        if (isDemo) {
            await setDisabledForm(false);
            return false;
        }
        const res = await fetch(`${serverName}/del`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Token.value
            },
            body: JSON.stringify({
                table: "links",
                id: delTarget
            })
        })
        await res.text();
        await refreshData();
        await setDisabledForm(false);
    }

    const ListItems = list.map((x, y) => {
        return <li key={y} className="list-group-item" style={{ display: "flex", justifyContent: "space-between", borderWidth: "1.5px" }}><span style={{ wordBreak: "break-all" }}>{x.src}</span><div style={{ width: "65px", marginLeft: "10px" }}><span style={{ display: "flex", justifyContent: "space-evenly", fontSize: "calc(var(--bs-body-font-size) * 1.2)" }}><ClipboardButton text={window.location.origin + "/link/" + x.link} /><i
            className="bi bi-trash-fill" data-bs-toggle="modal" onClick={() => { setDelTarget(x.id) }} data-bs-target="#deleteModal"></i></span></div></li>
    })

    return (
        <div>

            <DeleteModal onDelete={deleteItem} />
            <Navbar title="Link shortener" back={true} />

            <div className="container" style={{ paddingTop: "70px" }}>
                <div className="row">
                    <div className="gy-4 col-md-6">
                        <div className="card bg-light text-dark">
                            <img className="card-img" src={linkImage} alt="Link" />
                            <div className="card-img-overlay"
                                style={{ display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
                                <div style={{ width: "80%", backgroundColor: "#f7f9fb", padding: "5px" }}>
                                    Convert from:
                                    <input type="text" disabled={disabledForm} value={convertData.src} onChange={(ev) => { setConvertData({ link: convertData.link, src: ev.target.value }) }} style={{ width: "100%" }} /><br />
                                    To:
                                    <input type="text" disabled={disabledForm} value={convertData.link} onChange={(ev) => { setConvertData({ src: convertData.src, link: ev.target.value }) }} style={{ width: "100%" }} /><br />
                                    <button onClick={sendData} disabled={disabledForm} style={{ marginTop: "10px" }}>Convert</button>
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
