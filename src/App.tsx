import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import './App.css'

import TextDistortion from './components/textDistortion'
import FBOParticles from './components/fbo/FBOParticles'

function App() {
  const textDistortion = <TextDistortion text="PRESENT PRESENT" radius={2} height={6} segments={32} />
  const fboParticles = <FBOParticles />

  const [sample, setSample] = useState(textDistortion)

  return (
    <div id="canvas-container" className="relative w-full h-full bg-black">
      <Canvas>
        {sample}
      </Canvas>
      <div className="absolute top-0 left-0 w-full h-fit items-center justify-center p-8 flex gap-2">
        <button onClick={() => setSample(textDistortion)}>Text Distortion</button>
        <button onClick={() => setSample(fboParticles)}>FBO Particles</button>
      </div>
    </div>
  )
}

export default App
