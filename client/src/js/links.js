import ClipboardJS from "clipboard";
import { Tooltip } from "bootstrap";

new ClipboardJS('.bi-clipboard');
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new Tooltip(tooltipTriggerEl)
})