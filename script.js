const RESOLUTION = 800;
const RADIUS = 0.4;

let range;
let checkbox;
let canvas;
let ctxt;

window.onload = () => {
    range = document.getElementById("range");
    checkbox = document.getElementById("checkbox");
    canvas = document.getElementById("canvas");
    canvas.width = RESOLUTION;
    canvas.height = RESOLUTION;
    ctxt = canvas.getContext("2d");

    update();
}

function update() {
    let n = parseInt(range.value);

    ctxt.clearRect(0, 0, canvas.width, canvas.height);

    ctxt.save();
    ctxt.setTransform(RESOLUTION, 0, 0, RESOLUTION, RESOLUTION / 2, RESOLUTION / 2);

    ctxt.lineWidth = 0.01;

    if (checkbox.checked) {
        ctxt.beginPath();
        ctxt.arc(0, 0, RADIUS, 0, 2 * Math.PI);
        ctxt.stroke();
    }

    ctxt.beginPath();
    ctxt.arc(0, 0, 0.01, 0, 2 * Math.PI);
    ctxt.fill();

    ctxt.fillStyle = "#000";
    for (let i = 0; i < n - 1; i++) {
        let angle = 2 * Math.PI * i / (n - 1);
        ctxt.beginPath();
        ctxt.arc(RADIUS * Math.cos(angle), RADIUS * Math.sin(angle), 0.01, 0, 2 * Math.PI);
        ctxt.fill();
    }

    ctxt.fillStyle = "#F90";
    ctxt.strokeStyle = "#F90";

    let length = 0.5 / Math.cos(Math.PI / (n - 1));

    for (let i = 0; i < n - 1; i++) {
        let angle = 2 * Math.PI * (i + 0.5) / (n - 1);
        let x = Math.cos(angle);
        let y = Math.sin(angle);

        ctxt.beginPath();
        ctxt.arc(RADIUS * length * x, RADIUS * length * y, 0.01, 0, 2 * Math.PI);
        ctxt.fill();

        ctxt.beginPath();
        ctxt.moveTo(x, y);
        ctxt.lineTo(RADIUS * length * x, RADIUS * length * y);
        ctxt.stroke();
    }

    ctxt.beginPath();
    for (let i = 0; i < n - 1; i++) {
        let angle = 2 * Math.PI * (i + 0.5) / (n - 1);
        let x = RADIUS * length * Math.cos(angle);
        let y = RADIUS * length * Math.sin(angle);

        ctxt.lineTo(x, y, 0.01, 0, 2 * Math.PI);
    }
    ctxt.closePath();
    ctxt.stroke();

    ctxt.restore();
}
