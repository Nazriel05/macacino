pdfjsLib.GlobalWorkerOptions.workerSrc =
'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

let pdfDoc = null;
let scale = 1.2;
let selectedText = "";

const container = document.getElementById("pdf-container");
const popup = document.getElementById("ai-popup");
const warning = document.getElementById("warning-box");

pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
    pdfDoc = pdf;
    renderPages();
});

function renderPages(){
    container.innerHTML = "";

    for(let i=1;i<=pdfDoc.numPages;i++){
        pdfDoc.getPage(i).then(page=>{
            const viewport = page.getViewport({scale});

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            container.appendChild(canvas);

            page.render({
                canvasContext: ctx,
                viewport: viewport
            });
        });
    }
}

function zoomIn(){
    scale += 0.2;
    renderPages();
}

function zoomOut(){
    scale -= 0.2;
    if(scale < 0.6) scale = 0.6;
    renderPages();
}

document.addEventListener("mouseup",(e)=>{

    const text = window.getSelection().toString().trim();

    if(!text){
        popup.classList.add("hidden");
        return;
    }

    const words = text.split(/\s+/);

    if(words.length > 7){
        showWarning("Maksimal 7 kata.");
        popup.classList.add("hidden");
        return;
    }

    selectedText = text;

    popup.style.left = e.pageX + "px";
    popup.style.top = e.pageY + "px";

    popup.classList.remove("hidden");
});

function showWarning(msg){
    warning.innerText = msg;
    warning.classList.remove("hidden");

    setTimeout(()=>{
        warning.classList.add("hidden");
    },2000);
}

function translateText(){
    alert("Translate: " + selectedText);
}

function explainText(){
    alert("Explain: " + selectedText);
}