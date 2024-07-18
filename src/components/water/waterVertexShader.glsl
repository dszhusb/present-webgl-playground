uniform sampler2D heightmap;

void main(){
    vec2 cellSize=vec2(1./WIDTH,1./WIDTH);
    
    // Compute normal from heightmap
    csm_Normal=vec3(
        (texture2D(heightmap,uv+vec2(-cellSize.x,0)).x-texture2D(heightmap,uv+vec2(cellSize.x,0)).x)*WIDTH/BOUNDS,
        (texture2D(heightmap,uv+vec2(0,-cellSize.y)).x-texture2D(heightmap,uv+vec2(0,cellSize.y)).x)*WIDTH/BOUNDS,
        1.
    );
}