//@ts-nocheck
// https://codesandbox.io/s/r3f-water-shader-3kgfx5?file=/src/App.js:196-231

import * as THREE from 'three'
import { Environment, shaderMaterial } from '@react-three/drei'
import { useFrame, useThree } from "@react-three/fiber"
import { ShaderLib, UniformsUtils, Color, Vector2, MeshPhysicalMaterial } from "three"
import { GPUComputationRenderer } from "three-stdlib"
import { extend } from '@react-three/fiber'
import heightmapFragmentShader from "./heightmapFragmentShader.glsl"
import waterVertexShader from "./waterVertexShader.glsl"
import imageFragmentShader from "./imageFragmentShader.glsl"
import CustomShaderMaterialImpl from "three-custom-shader-material/vanilla"

// Texture width for simulation
const WIDTH = 128
// Water size in system units
const BOUNDS = 512

let waterUniforms
let heightmapVariable
let gpuCompute

export default function WaterShader() {
    const waterMaterial = new CustomShaderMaterialImpl({
        baseMaterial: MeshPhysicalMaterial,
        vertexShader: waterVertexShader,
        uniforms: UniformsUtils.merge([ShaderLib["physical"].uniforms, { heightmap: { value: null } }])
    })

    // Material attributes
    waterMaterial.transmission = 1
    waterMaterial.metalness = 1
    waterMaterial.roughness = 0
    // waterMaterial.map = texture

    // waterMaterial.color = new Color(0x217d9c)

    // Defines
    waterMaterial.defines.WIDTH = WIDTH.toFixed(1)
    waterMaterial.defines.BOUNDS = BOUNDS.toFixed(1)

    waterUniforms = waterMaterial.uniforms

    const gl = useThree((state) => state.gl)
    gpuCompute = new GPUComputationRenderer(WIDTH, WIDTH, gl)

    const heightmap0 = gpuCompute.createTexture()
    heightmapVariable = gpuCompute.addVariable("heightmap", heightmapFragmentShader, heightmap0)
    gpuCompute.setVariableDependencies(heightmapVariable, [heightmapVariable])
    heightmapVariable.material.uniforms["mousePos"] = { value: new Vector2(10000, 10000) }
    heightmapVariable.material.uniforms["mouseSize"] = { value: 20.0 }
    heightmapVariable.material.uniforms["viscosityConstant"] = { value: 0.9 }
    heightmapVariable.material.uniforms["heightCompensation"] = { value: 1 }
    heightmapVariable.material.defines.BOUNDS = BOUNDS.toFixed(1)

    const error = gpuCompute.init()
    if (error !== null) {
        console.error(error)
    }

    const pointer = useThree((state) => state.pointer)

    useFrame(() => {
        const uniforms = heightmapVariable.material.uniforms
        uniforms["mousePos"].value.set(pointer.x * BOUNDS, -pointer.y * BOUNDS)
        gpuCompute.compute()
        waterUniforms["heightmap"].value = gpuCompute.getCurrentRenderTarget(heightmapVariable).texture
    })

    return (
        <>
            <Environment preset="sunset" />
            <mesh material={waterMaterial} rotation={[0, 0, 0]} position={[0, 0, -200]} scale={0.4} castShadow receiveShadow>
                <planeGeometry args={[BOUNDS, BOUNDS, WIDTH, WIDTH]} />
            </mesh>
        </>
    )
}