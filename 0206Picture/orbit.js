import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.1/three.module.min.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'
import { TextureLoader } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.1/three.module.min.js';
//for more modern version of orbit control user importmap https://stackoverflow.com/questions/75250424/threejs-orbitcontrol-import-version-from-cdn

let camera3D, scene, renderer, cube;
let controls;

// Create a textbox element
const textbox = document.createElement("input");

// Set the position of the textbox to the middle of the canvas
textbox.style.position = "absolute";
textbox.style.left = "50%";
textbox.style.top = "50%";
textbox.style.transform = "translate(-50%, -50%)";

// Append the textbox to the document body
document.body.appendChild(textbox);

// Add event listener to the textbox
textbox.addEventListener("click", function() {
    // Create a sentence element
    const sentence = document.createElement("div");
    sentence.textContent = "Hi, how are you?";

    // Set the position of the sentence to the middle of the canvas
    sentence.style.position = "absolute";
    sentence.style.left = "50%";
    sentence.style.top = "25%";
    sentence.style.transform = "translate(-50%, -50%)";
    sentence.style.fontSize = "26px";

    // Append the sentence to the document body
    document.body.appendChild(sentence);
});

textbox.addEventListener("input", function() {
    if (textbox.value === "hi") {
        // Update the position of the sentence to the middle of the canvas
        textbox.style.left = "50%";
        textbox.style.top = "50%";
        textbox.style.transform = "translate(-50%, -50%)";

        // Create a sentence element
        const sentence = document.createElement("div");
        sentence.textContent = "Welcome to the new world!";

        // Set the position of the sentence to the middle of the canvas
        sentence.style.position = "absolute";
        sentence.style.left = "50%";
        sentence.style.top = "30%";
        sentence.style.transform = "translate(-50%, -50%)";
        sentence.style.fontSize = "26px";

        // Append the sentence to the document body
        document.body.appendChild(sentence);
    }
});







function init3D() {
    scene = new THREE.Scene();
    camera3D = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.DodecahedronGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: "#4285F4"});
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    let bgGeometery = new THREE.DodecahedronGeometry(950, 60, 40);
    // let bgGeometery = new THREE.CylinderGeometry(725, 725, 1000, 10, 10, true)
    bgGeometery.scale(-1, 1, 1);
    // has to be power of 2 like (4096 x 2048) or(8192x4096).  i think it goes upside down because texture is not right size
    let panotexture = new TextureLoader().load("green.jpg");
    // var material = new THREE.MeshBasicMaterial({ map: panotexture, transparent: true,   alphaTest: 0.02,opacity: 0.3});
    let backMaterial = new THREE.MeshBasicMaterial({ map: panotexture });

    let back = new THREE.Mesh(bgGeometery, backMaterial);
    scene.add(back);


    controls = new OrbitControls(camera3D, renderer.domElement);
    camera3D.position.z = 5;
    animate();
}

function animate() {
    controls.update();  //orbit controls
    renderer.render(scene, camera3D);
    requestAnimationFrame(animate);
}

init3D();
