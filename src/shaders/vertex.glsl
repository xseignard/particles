@import ./utils/rgb2hsv;
@import ./utils/map;
@import ./utils/noise;

uniform sampler2D texture;
uniform float time;
uniform vec3 boundingMin;
uniform vec3 boundingMax;
varying vec4 vColor;

void main() {
	float rangeX = (boundingMin.x - boundingMax.x) * -1.0;
	float rangeY = (boundingMin.y - boundingMax.y) * -1.0;
	float offsetX = 0.0 - boundingMin.x;
	float offsetY = 0.0 - boundingMin.y;
	float pickX = (position.x + offsetX) / rangeX;
	float pickY = (position.y + offsetY) / rangeY;
	vColor = texture2D(texture, vec2(pickX, pickY));

	vec3 newPos = position;
	// newPos.z += noise(position.x) * 10.0 * sin(time * 0.0005);

	gl_PointSize = 1.0;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);;
}
