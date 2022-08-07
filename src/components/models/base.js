/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF, useScroll } from '@react-three/drei'
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';


export default function Model({ colors, getBreak, footRef, ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/base-packed.glb')
  
  const scroll = useScroll()
  
  useEffect(()=>{
    materials['BASE BASE BASE'].aoMap =  materials['BASE BASE BASE'].map
    materials['BASE BASE BASE'].aoMapIntensity = 1
    materials['BASE BASE BASE'].color = new THREE.Color(255/255, 200/255, 150/255)
  })
  
  useFrame((state)=>{
    const section = getBreak(scroll.offset)
    materials['00 SHELVES'].color.lerp(new THREE.Color(colors[section][0]/255, colors[section][1]/255, colors[section][2]/255), 0.05)
  })
  

  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[-13.6396122, -0.27626351, -13.2831745]} scale={0.00174011}>
        <mesh geometry={nodes.mesh_0.geometry} material={materials['00 FLOOR AND WALLS']} />
        <mesh geometry={nodes.mesh_0_1.geometry} material={materials['BASE BASE BASE']} />
        <mesh geometry={nodes.mesh_0_2.geometry} material={materials['00 SHELVES']} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/base-packed.glb')
