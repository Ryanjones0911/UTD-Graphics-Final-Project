precision highp float;

uniform sampler2D sunMap;
uniform float time;

varying vec2 vUv;
varying vec3 vPosition;
//This code is based on this article: https://sangillee.com/2024-06-29-create-realistic-sun-with-shaders/
float random (in vec3 st) {
    return fract(sin(dot(st,vec3(12.9898,78.233,23.112))) * 12943.145);
}

#define NUM_OCTAVES 6

float noise (in vec3 _pos) {
    vec3 i_pos = floor(_pos);
    vec3 f_pos = fract(_pos);

    float aa = random(i_pos);
    float ab = random(i_pos + vec3(1., 0., 0.));
    float ac = random(i_pos + vec3(0., 1., 0.));
    float ad = random(i_pos + vec3(1., 1., 0.));
    float ae = random(i_pos + vec3(0., 0., 1.));
    float af = random(i_pos + vec3(1., 0., 1.));
    float ag = random(i_pos + vec3(0., 1., 1.));
    float ah = random(i_pos + vec3(1., 1., 1.));

    vec3 t = smoothstep(0., 1., f_pos);

    return mix(
        mix(
            mix(aa,ab,t.x),
            mix(ac,ad,t.x), 
        t.y),
        mix(
            mix(ae,af,t.x), 
            mix(ag,ah,t.x), 
        t.y), 
    t.z);
}

float fBm (in vec3 _pos, in float sz) {
    float v = 0.0;
    float a = 0.2;
    _pos *= sz;

    vec3 angle = vec3(-0.001*time, 0.0001*time, 0.0004*time);

    mat3 rotx = mat3(
        1, 0, 0,
        0, cos(angle.x), -sin(angle.x),
        0, sin(angle.x), cos(angle.x)
    );

    mat3 roty = mat3(
        cos(angle.y), 0, sin(angle.y),
        0, 1, 0,
        -sin(angle.y), 0, cos(angle.y)
    );

    mat3 rotz = mat3(
        cos(angle.z), -sin(angle.z), 0,
        sin(angle.z), cos(angle.z), 0,
        0, 0, 1
    );

    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(_pos);
        _pos = rotx * roty * rotz * _pos * 2.0;
        a *= 0.8;
    }
    return v;
}

void main() {
    vec3 st = normalize(vPosition);

    vec3 q;
    q.x = fBm(st, 5.);
    q.y = fBm(st + vec3(1.2,3.2,1.52), 5.);
    q.z = fBm(st + vec3(0.02,0.12,0.152), 5.);

    float n = fBm(st + q + vec3(1.82,1.32,1.09), 5.);

    vec3 color = mix(vec3(1.,0.4,0.), vec3(1.), n*n);
    color = mix(color, vec3(1.,0.,0.), q * 0.7);

    gl_FragColor = vec4(1.6 * color, 1.0);
}
