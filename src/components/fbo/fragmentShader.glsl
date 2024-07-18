uniform vec2 u_resolution;
uniform float u_time;

float random(vec2 st){
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

void main(){
    vec3 color=vec3(.34,.53,.96);
    gl_FragColor=vec4(color,1.);
}