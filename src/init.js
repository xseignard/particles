import * as THREE from 'three';
import 'three/examples/js/controls/OrbitControls';
import Stats from 'stats.js';

// stats
export const stats = new Stats();
document.body.appendChild(stats.domElement);

// renderer
export const renderer = new THREE.WebGLRenderer({
	antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// scene
export const scene = new THREE.Scene();

// camera
export const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
camera.position.set(0, 2, 20);

// controls
export const controls = new THREE.OrbitControls(camera, renderer.domElement);

// axis helper
const axisHelper = new THREE.AxisHelper(100);
// scene.add(axisHelper);

// light
const light = new THREE.AmbientLight(0x888888);
scene.add(light);

const handleResize = () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
};
addEventListener('resize', handleResize);
