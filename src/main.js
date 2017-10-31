import * as THREE from 'three';
import { renderer, scene, camera, controls, stats } from './init';
import './main.css';

import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import logo from './img/bird.jpg';

// to keep image proportions
const radiusX = 10;
const radiusY = 10;
// number of particles (500 000 on desktop)
let factor = 5000;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	// (100 000 on mobile)
	factor = 1000;
}
const particles = radiusX * radiusY * factor;
const geometry = new THREE.BufferGeometry();
// fill postions with random postions inside the boundaries
const positions = new Float32Array(particles * 3);
for (let i = 0; i < particles; i += 3) {
	positions[i + 0] = (Math.random() * 2 - 1) * radiusX;
	positions[i + 1] = (Math.random() * 2 - 1) * radiusY;
	positions[i + 2] = 0;
}
geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
// get the bounding box of the geometry
geometry.computeBoundingBox();
const max = geometry.boundingBox.max;
const min = geometry.boundingBox.min;

// shader material
// uniforms : the same for each vertice during ONE render loop
const uniforms = {
	texture: { value: new THREE.TextureLoader().load(logo) },
	boundingMin: { value: min },
	boundingMax: { value: max },
	time: { value: 0 },
};
const shaderMaterial = new THREE.ShaderMaterial({
	uniforms,
	vertexShader,
	fragmentShader,
	blending: THREE.AdditiveBlending,
	depthTest: false,
	transparent: true,
});

// create the particle system
const particleSystem = new THREE.Points(geometry, shaderMaterial);
scene.add(particleSystem);

const animate = timestamp => {
	requestAnimationFrame(animate);
	stats.begin();
	// update the time uniform
	uniforms.time.value = timestamp;
	renderer.render(scene, camera);
	stats.end();
};
animate();
