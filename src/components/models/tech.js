/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/tech-packed.glb')
  const { actions } = useAnimations(animations, group)

  const nodesName = Object.keys(nodes)


  useEffect(()=>{
    nodesName.forEach((n)=>{
        if (nodes[n].type === 'SkinnedMesh' ){
            nodes[n].frustumCulled = false
            let geo = nodes[n].geometry
            geo.boundingBox.max = new THREE.Vector3(100, 100, 100)
            geo.boundingBox.min = new THREE.Vector3(-100, -100, -100)
            geo.boundingSphere.center = new THREE.Vector3(0, 0, 0)
        }
    })

    animations.forEach((a)=>{
      actions[a.name].play()   
    })
  
  })
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="3D_Printer002" position={[-2.83031559, 1.92346072, 1.55858958]} rotation={[-Math.PI, 1.55346261, -Math.PI]} scale={0.15361936}>
          <group name="Cube007" position={[-0.66894186, 2.72034931, -2.15984917]} scale={[13.7339802, 13.7339783, 13.7339802]}>
            <group name="Cube011" position={[-0.18309036, -0.00938165, 0.0383593]}>
              <group position={[-3.7286396, -0.7021628, -0.31973252]} scale={0.00025346}>
                <mesh name="mesh_1"   geometry={nodes.mesh_1.geometry} material={materials['03 3D TECH MATERIAL']} />
                <mesh name="mesh_1_1"   geometry={nodes.mesh_1_1.geometry} material={materials['0T_Brass_mqm']} />
                <mesh name="mesh_1_2"   geometry={nodes.mesh_1_2.geometry} material={materials['0D_Metal_Dark_mqm']} />
              </group>
            </group>
            <mesh name="mesh_2"   geometry={nodes.mesh_2.geometry} material={materials['03 3D TECH MATERIAL']} position={[-3.7286396, -0.7021628, -0.31973252]} scale={0.00025346} />
          </group>
          <group name="Logo002" position={[-2.81258869, 0.01834202, -2.39997196]} scale={[13.7339802, 13.7339783, 13.7339802]}>
            <group name="Cube010" position={[0.01079406, -0.02503455, -0.03953468]}>
              <mesh name="mesh_5"   geometry={nodes.mesh_5.geometry} material={materials['03 3D TECH MATERIAL']} position={[-3.7286396, -0.7021628, -0.31973252]} scale={0.00025346} />
            </group>
            <group name="Cube012" position={[-0.00249796, 0.0085181, 0.00933006]} rotation={[-Math.PI, 0.01752493, -Math.PI]} scale={[0.49995854, 0.49995863, 0.49995854]}>
              <mesh name="mesh_6"   geometry={nodes.mesh_6.geometry} material={materials['03 Plastic.001']} morphTargetDictionary={nodes.mesh_6.morphTargetDictionary} morphTargetInfluences={nodes.mesh_6.morphTargetInfluences} position={[-3.7286396, -0.7021628, -0.31973252]} scale={0.00025346} />
            </group>
            <mesh name="mesh_7"   geometry={nodes.mesh_7.geometry} material={materials['03 3D TECH MATERIAL']} position={[-3.7286396, -0.7021628, -0.31973252]} scale={0.00025346} />
          </group>
          <group name="BezierCurve003" position={[-6.22031689, 1.8340807, -2.83818078]} rotation={[0, 0, -3.07799888]} scale={[13.7339802, 13.7339783, 13.7339802]}>
            <mesh name="mesh_0"   geometry={nodes.mesh_0.geometry} material={materials['03 Plastic.001']} morphTargetDictionary={nodes.mesh_0.morphTargetDictionary} morphTargetInfluences={nodes.mesh_0.morphTargetInfluences} position={[-3.7286396, -0.7021628, -0.31973252]} scale={0.00025346} />
          </group>
          <group name="Cube008" position={[-4.30800629, 7.25930119, -2.23007274]} scale={[13.7339802, 13.7339783, 13.7339802]}>
            <group name="Cylinder021" position={[-0.00129198, 0.06232679, -0.04947553]}>
              <mesh name="mesh_3"   geometry={nodes.mesh_3.geometry} material={materials['03 3D TECH MATERIAL']} position={[-3.7286396, -0.7021628, -0.31973252]} scale={0.00025346} />
            </group>
          </group>
        </group>
        <group name="Cloud001" position={[-3.38446116, 2.08429861, 0.95262164]} rotation={[0, Math.PI / 2, 0]} scale={0.11578458}>
          <group name="02_CLOUD003">
            <group position={[-3.7286396, -0.7021628, -0.31973252]} scale={0.00025346}>
              <skinnedMesh name="mesh_8" geometry={nodes.mesh_8.geometry} material={materials['03 3D TECH MATERIAL']} skeleton={nodes.mesh_8.skeleton} />
              <skinnedMesh name="mesh_8_1" geometry={nodes.mesh_8_1.geometry} material={materials['03 Plastic.003']} skeleton={nodes.mesh_8_1.skeleton} />
              <skinnedMesh name="mesh_8_2" geometry={nodes.mesh_8_2.geometry} material={materials['03 Plastic.004']} skeleton={nodes.mesh_8_2.skeleton} />
              <skinnedMesh name="mesh_8_3" geometry={nodes.mesh_8_3.geometry} material={materials['03 Plastic.005']} skeleton={nodes.mesh_8_3.skeleton} />
              <skinnedMesh name="mesh_8_4" geometry={nodes.mesh_8_4.geometry} material={materials['03 Plastic.006']} skeleton={nodes.mesh_8_4.skeleton} />
              <skinnedMesh name="mesh_8_5" geometry={nodes.mesh_8_5.geometry} material={materials['03 Plastic.007']} skeleton={nodes.mesh_8_5.skeleton} />
            </group>
          </group>
          <primitive object={nodes.HipController} />
          <primitive object={nodes.Bone} />
        </group>
        <group name="Vivi001" position={[-2.95971704, 1.72976351, 1.1171068]} rotation={[0, Math.PI / 2, 0]} scale={0.69083506}>
          <group name="body002">
            <skinnedMesh name="mesh_9" geometry={nodes.mesh_9.geometry} material={materials['03 3D TECH MATERIAL']} skeleton={nodes.mesh_9.skeleton} position={[-3.7286396, -0.7021628, -0.31973252]} scale={0.00025346} />
          </group>
          <group name="feet004" />
          <group name="feet005" />
          <group name="hands002" />
          <group name="hat002" />
          <group name="head002">
            <skinnedMesh name="mesh_10" geometry={nodes.mesh_10.geometry} material={materials['03 Plastic.003']} skeleton={nodes.mesh_10.skeleton} position={[-3.7286396, -0.7021628, -0.31973252]} scale={0.00025346} />
          </group>
          <group name="torso002" />
          <primitive object={nodes['MCH-upper_arm_ik_targetparentL']} />
          <primitive object={nodes['MCH-upper_arm_ik_targetparentR']} />
          <primitive object={nodes['MCH-thigh_ik_targetparentL']} />
          <primitive object={nodes['MCH-thigh_ik_targetparentR']} />
          <primitive object={nodes.root} />
          <primitive object={nodes['MCH-torsoparent']} />
          <primitive object={nodes['MCH-hand_ikparentL']} />
          <primitive object={nodes['MCH-hand_ikparentR']} />
          <primitive object={nodes['MCH-foot_ikparentL']} />
          <primitive object={nodes['MCH-foot_ikparentR']} />
        </group>
        <group position={[-3.7286396, -0.7021628, -0.31973252]} scale={0.00025346}>
          <mesh name="mesh_4"   geometry={nodes.mesh_4.geometry} material={materials['03 3D TECH MATERIAL']} />
          <mesh name="mesh_4_1"   geometry={nodes.mesh_4_1.geometry} material={materials['03 Plastic.001']} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/tech-packed.glb')