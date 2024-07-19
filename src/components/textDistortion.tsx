//@ts-nocheck
//https://tympanus.net/codrops/2024/05/08/exploring-a-3d-text-distortion-effect-with-react-three-fiber/

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, MeshTransmissionMaterial } from "@react-three/drei"

interface Props {
    text: string;
    radius: number;
    height: number;
    segments: number;
}

export default function TextDistortion({ scale, scrollState, text, radius, height, segments }) {
    const ref = useRef<any>();

    // Rotate the text
    useFrame(() => {
        ref.current.rotation.y += 0.01;
        // ref.current.rotation.x += 0.01;
        // ref.current.rotation.z += 0.01;
    });

    // Calculate positions for text
    const textPositions: { x: number; z: number }[] = [];
    const angleStep = (2 * Math.PI) / text.length;
    for (let i = 0; i < text.length; i++) {
        const angle = i * angleStep;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        textPositions.push({ x, z });
    }

    return (
        <group ref={ref} position={[0, 0, 0]} scale={scale.xy.min() * 0.1}>
            <mesh>
                <cylinderGeometry args={[radius, radius, height, segments]} />
                <MeshTransmissionMaterial
                    backside
                    chromaticAberration={0.06}
                    distortionScale={0.2}
                    backsideThickness={5}
                    thickness={2}
                />
            </mesh>
            {text.split("").map((char: string, index: number) => (
                <Text
                    key={index}
                    position={[textPositions[index].x, 0, textPositions[index].z]}
                    rotation={[0, -angleStep * index + Math.PI / 2, 0]}
                    fontSize={0.3}
                    lineHeight={1}
                    letterSpacing={0.02}
                    color="white"
                    textAlign="center"
                >
                    {char}
                </Text>
            ))}
        </group>
    );
}