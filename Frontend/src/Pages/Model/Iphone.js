import React from 'react'
import { Model } from '../../Components/Iphone';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Iphone() {
  return (
    <Canvas style={{height:'100vh'}} camera={{ fov: 34, position: [2, 0.2, -2] }}>
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <ambientLight intensity={5} />
        <OrbitControls enableZoom={true} />
        <Model />
      </Canvas>
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