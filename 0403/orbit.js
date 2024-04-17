import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.1/three.module.min.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'
import { TextureLoader } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.1/three.module.min.js';

let camera3D, scene, renderer, cube;
let controls;

const textbox = document.createElement("input");

textbox.style.position = "absolute";
textbox.style.left = "50%";
textbox.style.top = "50%";
textbox.style.transform = "translate(-50%, -50%)";

document.body.appendChild(textbox);

function init3D() {
    scene = new THREE.Scene();
    camera3D = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.DodecahedronGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: "#4285F4"});
    cube = new THREE.Mesh(geometry, material);


    let bgGeometery = new THREE.DodecahedronGeometry(950, 60, 40);
    bgGeometery.scale(-1, 1, 1);
    let panotexture = new TextureLoader().load("green.jpg");
    let backMaterial = new THREE.MeshBasicMaterial({ map: panotexture });

    let back = new THREE.Mesh(bgGeometery, backMaterial);
    scene.add(back);


    controls = new OrbitControls(camera3D, renderer.domElement);
    camera3D.position.z = 5;
    animate();
}

function animate() {
    controls.update(); 
    renderer.render(scene, camera3D);
    requestAnimationFrame(animate);
}

init3D();


document.addEventListener("dragover", function(event) {
    event.preventDefault();
});

document.addEventListener("drop", function(event) {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const texture = new THREE.TextureLoader().load(event.target.result);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        cube.material = material;

        const sentence = document.createElement("div");
        sentence.textContent = "Wow, I like my new outfit, thank you!";

        sentence.style.position = "absolute";
        sentence.style.left = "50%";
        sentence.style.top = "40%";
        sentence.style.transform = "translate(-50%, -50%)";
        sentence.style.fontSize = "26px";

        document.body.appendChild(sentence);
    };

    reader.readAsDataURL(file);
});

