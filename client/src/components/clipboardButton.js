import { useEffect } from 'react';
import ClipboardJS from "clipboard";
import { Tooltip } from "bootstrap";

const ClipboardButton = (props) => {
    
    const copy = (e) => {
        const x = e.target;
        x.classList.add("bi-clipboard-check");
        x.classList.remove("bi-clipboard");
        x.setAttribute("title", "Copied!")
    }

    const copyOut = (e) => {
        const x = e.target;
        setTimeout(() => {
            x.classList.add("bi-clipboard");
            x.classList.remove("bi-clipboard-check");
            x.setAttribute("title", "Copy link")
        }, 300)
    }

    useEffect(() => {
        new ClipboardJS('.copy');
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new Tooltip(tooltipTriggerEl)
        })
    }, []);

    return (
            <i className="copy bi bi-clipboard" onClick={copy}
                onMouseLeave={copyOut} data-toggle="tooltip" data-bs-placement="bottom" title="Copy link"
                data-clipboard-text={props.text} style={props.styleProp}></i>
    );
}

export default ClipboardButton;