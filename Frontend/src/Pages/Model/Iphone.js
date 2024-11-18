import React, { Suspense } from 'react'
import { Model } from '../../Components/Iphone';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";


function Iphone() {
  return (
    <Canvas style={{ height: '100vh', background: 'black' }} camera={{ fov: 34, position: [1, 0.2, -2] }}>
      {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> */}
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        {/* Add Environment with an HDR image */}
        {/* <Environment files="/autumn_field_puresky_4k.hdr" background={false} /> */}
        <Environment files="/studio_small_09_4k.hdr" background={false} />
        {/* <Environment files="/studio_small_08_4k.hdr" background={false} /> */}
        {/* <Environment files="/rogland_moonlit_night_4k.hdr" background={false} /> */}
        <Model />
      </Suspense>
      <OrbitControls enableZoom={true} />
    </Canvas>
    // <Canvas style={{height:'100vh'}} camera={{ fov: 34, position: [2, 0.2, -2] }}>
    //     <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
    //     <ambientLight intensity={5} />
    //     <OrbitControls enableZoom={true} />
    //     <Model />
    //   </Canvas>
  )
}

export default Iphone


// import ModelViewer from './Claude'

// function Imodel() {
//   return (
//     <ModelViewer modelUrl="/iphone.glb" />
//   )
// }

// export default Imodel()