import { useState, useRef } from 'react'
import { GlobalCanvas, SmoothScrollbar } from '@14islands/r3f-scroll-rig'
import './App.css'

import MeshWindow from './components/MeshWindow'

function App() {
  const eventSource = useRef(null);
  const [selected, setSelected] = useState(0)

  return (
    <div ref={eventSource}>
      <div id="canvas-container" className="relative w-full h-full p-16">
        <MeshWindow selected={selected} />
        <div className="absolute top-0 left-0 w-full h-fit items-center justify-center p-8 flex gap-2 z-50">
          <button onClick={() => setSelected(0)}>Text Distortion</button>
          <button onClick={() => setSelected(1)}>FBO Particles</button>
          <button onClick={() => setSelected(2)}>Water</button>
        </div>
      </div>
      <article className="text-white p-8">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ultricies ex. Fusce gravida nisl non ex luctus scelerisque. Sed nec malesuada nibh. Sed pellentesque nisi sit amet tortor rutrum aliquet. In eleifend vestibulum tempus. Suspendisse suscipit ante malesuada hendrerit varius. Quisque dapibus, mi molestie imperdiet gravida, massa mauris sollicitudin justo, eu dignissim justo nulla quis quam. Morbi bibendum nisl vitae volutpat pellentesque. Nunc ut rutrum justo. Curabitur vitae ex sit amet magna hendrerit tempus sit amet id enim. Sed varius augue lacus, non facilisis libero tristique nec.
        </p>
        <p>
          Nulla malesuada nec nunc in tempus. Mauris sit amet ipsum eget est ultrices dignissim. Morbi quis erat at nibh varius dapibus sit amet eu lectus. Curabitur elementum orci eu ullamcorper molestie. Fusce id lectus ac nibh dignissim feugiat ac a nibh. Suspendisse volutpat sodales velit, nec ullamcorper ex tincidunt nec. Duis varius eu sem id semper. Duis et ultricies arcu. Vivamus quis fermentum quam, id bibendum ipsum. Sed auctor ligula enim, sed volutpat neque gravida eget. Aliquam scelerisque ac lacus in commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
        </p>
        <p>
          Aliquam placerat ullamcorper erat, at molestie turpis eleifend vitae. In venenatis a tortor ac porttitor. Phasellus congue velit mi, sed elementum magna iaculis aliquet. Maecenas vel elementum magna. Praesent in dignissim arcu, sit amet pretium ex. Donec vitae consectetur est. Integer bibendum lorem non tortor hendrerit, at egestas sem rhoncus. Aenean tempus purus vitae lobortis sodales. Vivamus sit amet lobortis mi.
        </p>
        <p>
          Aenean semper nisi eget nisl fermentum venenatis. Fusce pulvinar lorem magna, tempor mollis diam tristique eu. Cras in sem dolor. Mauris libero risus, venenatis nec tellus ac, varius tempus nisl. Phasellus ut dui purus. Duis vitae libero vel arcu fringilla mollis et at risus. Fusce sodales pretium cursus. Duis vestibulum turpis et nisi vestibulum iaculis. Aenean at elementum felis, ut vestibulum felis. Donec a commodo nulla. Fusce quis orci tristique, tempus tellus vel, tempus orci. Curabitur ipsum diam, luctus et porta a, placerat a lacus. Suspendisse potenti. Pellentesque tempus tristique iaculis. Fusce pellentesque facilisis quam in convallis. Sed placerat tincidunt ipsum sit amet dignissim.
        </p>
      </article>
      <SmoothScrollbar enabled={true} config={{ syncTouch: true }} />
      <GlobalCanvas eventPrefix="client" flat className="pointer-events-none" />
    </div>
  )
}

export default App
