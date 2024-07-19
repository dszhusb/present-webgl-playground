//@ts-nocheck

import { useRef } from 'react'
import { ScrollScene, UseCanvas } from '@14islands/r3f-scroll-rig'

import TextDistortion from './textDistortion'
import FBOParticles from './fbo/FBOParticles'
import WaterShader from './water/WaterShader'

export default function MeshWindow({ selected }) {
    const el = useRef<HTMLElement>(null)

    return (
        <>
            <div ref={el} className="w-full h-full min-h-screen bg-black" />
            {selected === 0 &&
                <UseCanvas>
                    <ScrollScene track={el}>
                        {(props) => (<TextDistortion text="PRESENT PRESENT" radius={2} height={6} segments={32} {...props} />)}
                    </ScrollScene>
                </UseCanvas>
            }
            {selected === 1 &&
                <UseCanvas>
                    <ScrollScene track={el}>
                        {(props) => (<FBOParticles {...props} />)}
                    </ScrollScene>
                </UseCanvas>
            }
            {selected === 2 &&
                <UseCanvas>
                    <ScrollScene track={el}>
                        {(props) => (<WaterShader {...props} />)}
                    </ScrollScene>
                </UseCanvas>
            }
        </>
    )
}