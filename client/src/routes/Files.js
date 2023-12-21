import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import uploadImage from "../gfx/upload.png";
import Alert from '../components/Alert';
import DeleteModal from '../components/DeleteModal';
import Navbar from '../components/Navbar';
import ClipboardButton from '../components/ClipboardButton';
import { FileDrop } from 'react-file-drop';
import "./Files.style.css"
import Token from '../components/Token';
const settings = require("../settings.json");
const serverName = settings.serverData.name;
const isDemo = settings.demo;

console.log(isDemo);

const FilesPage = (props) => {

    const [alertDisplay, setAlertDisplay] = useState(false);
    const [list, setList] = useState([]);
    const [convertData, setConvertData] = useState({ link: "", src: undefined });
    const [disabledForm, setDisabledForm] = useState(false);
    const [delTarget, setDelTarget] = useState(999);
    const [fileTransfered, setFileTransfered] = useState(false);

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
                table: "files",
            })
        })
        const json = await data.json();
        await setList(json);
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
                table: "files",
                id: delTarget
            })
        })
        await res.text();
        await refreshData();
        await setDisabledForm(false);
    }

    const transferFile = (x) => {
        setConvertData({link: "", file: x[0]});
        setFileTransfered(true);
    }

    const alert = async () => {
        await setAlertDisplay(true);
        // setTimeout(() => { setAlertDisplay (false) }, 2000 )
    }

    const sendData = async () => {
        if (isDemo) {
            await alert();
            await setDisabledForm(false);
            await setConvertData({link: "", src: ""})
            await setFileTransfered(false);
            window.alert("Not available in demo mode!");
            return false;
        }
        const form = new FormData();
        form.append("file", convertData.file)
        form.append("link", convertData.link)
        await setDisabledForm(true);
        const res = await fetch(`${serverName}/addFile`, {
            method: "POST",
            headers: {
                'Authorization': Token.value
            },
            body: form
        })
        await res.text();

        await setConvertData({link: "", src: ""})
        await refreshData();
        await setDisabledForm(false);
        await setFileTransfered(false);

    }

        const ListItems = list.map((x, y) => {
            return <li key={y} className="list-group-item" style={{ display: "flex", justifyContent: "space-between", borderWidth: "1.5px" }}><span style={{wordBreak: "break-all"}}>{x.src}</span><div style={{width: "65px", marginLeft: "10px"}}><span style={{display: "flex", justifyContent: "space-evenly", fontSize: "calc(var(--bs-body-font-size) * 1.2)" }}><ClipboardButton text={window.location.origin+ "/file/" + x.link}/><i
                className="bi bi-trash-fill" data-bs-toggle="modal" onClick={() => { setDelTarget(x.id) }} data-bs-target="#deleteModal"></i></span></div></li>
        })

        return (
            <main>
                <DeleteModal onDelete={deleteItem} />
                <Navbar title="File manager" back={true} />

                <div className="container" style={{ paddingTop: "70px" }}>
                    <div className="row">
                        <div className="gy-4 col-md-6">
                            <div className="card bg-light text-dark">
                                <img className="card-img" src={uploadImage} alt="Upload" />

                                <div className="card-img-overlay"
                                    style={{ display: fileTransfered?"flex":"none", textAlign: "center", justifyContent: "center", alignItems: "center"}}>
                                    <div style={{ width: "80%", backgroundColor: "#f7f9fb", padding: "5px" }}>
                                        Link:
                                        <input type="text" disabled={disabledForm} value={convertData.link} onChange={(ev) => { setConvertData({ link: ev.target.value, file: convertData.file }) }} style={{ width: "100%" }} /><br />
                                        <button onClick={sendData} disabled={disabledForm} style={{ marginTop: "10px" }}>Convert</button>
                                    </div>
                                </div>


                                <FileDrop onDrop={transferFile}>
                                    <div className="card-img-overlay"
                                        style={{ display: fileTransfered?"none":"flex", textAlign: "center", justifyContent: "center", alignItems: "center"}}>

                                        <fieldset id="zone" style={{ width: "fit-content", backgroundColor: "#f7f9fb" }}>

                                            <div className="no-file">
                                                <legend>Drop a file inside&hellip;</legend>
                                                <input onChange={(ev) => {transferFile(ev.target.files); ev.target.value=null }} style={{ textAlignLast: "center" }} type="file"></input><p>Or click here to <em>Browse</em>..</p>
                                            </div>

                                            <div className="file-hold">
                                                <legend>Drop here!</legend>
                                            </div>

                                            <div className="file-over">
                                                <legend>Drop now!</legend>
                                            </div>

                                            <p style={{ zIndex: 10, position: "relative" }}>
                                            </p>

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
                {alertDisplay && <Alert variant="danger">
                    You can't upload files in demo mode!
                </Alert>}
            </main>
        );
}

export default FilesPage;
