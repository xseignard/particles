import * as THREE from 'three';
import { renderer, scene, camera, controls, stats } from './init';
import './main.css';

import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import logo from './img/bricks.jpg';

const radius = 2;
const particles = 600000;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particles * 3);
const colors = new Float32Array(particles * 3);
const sizes = new Float32Array(particles);
const color = new THREE.Color();
for (let i = 0; i < particles; i += 3) {
	positions[i + 0] = (Math.random() * 2 - 1) * radius;
	positions[i + 1] = (Math.random() * 2 - 1) * radius;
	positions[i + 2] = 0;
}
geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));

geometry.computeBoundingBox();
const max = geometry.boundingBox.max;
const min = geometry.boundingBox.min;
console.log(max, min);

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

const particleSystem = new THREE.Points(geometry, shaderMaterial);
scene.add(particleSystem);

// post processing
// const composer = new THREE.EffectComposer(renderer);
//
// const renderPass = new THREE.RenderPass(scene, camera);
// const grainPass = new THREE.ShaderPass(THREE.FilmShader);
// grainPass.renderToScreen = true;
// grainPass.uniforms['grayscale'] = false;
//
// composer.addPass(renderPass);
// composer.addPass(grainPass);

const animate = timestamp => {
	requestAnimationFrame(animate);
	stats.begin();
	uniforms.time.value = timestamp;
	renderer.render(scene, camera);
	// composer.render();
	stats.end();
};
animate();
