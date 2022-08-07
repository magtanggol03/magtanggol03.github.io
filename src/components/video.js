import React, {useEffect, useState} from "react";
import {Canvas, useThree, useFrame } from "@react-three/fiber";
import {useAspect, useMask} from "@react-three/drei";
import * as THREE from 'three'

import { state, damp } from '../utils'
import { useSnapshot } from 'valtio'

export default function Video({aspect, url, position, index}) {
    const size = useAspect(aspect[0], aspect[1])
    const stencil = useMask(index, false)
    const [video] = useState(() => 
      Object.assign(document.createElement('video'),
      {
        src: url,
        crossOrigin: 'Anonymous',
        loop: true,
        muted: true
      }
    ))
    useEffect(()=> void video.play(), [video])
  
    console.log('size video:', size)

    return (
      <mesh position={position} scale={size}>
        <planeGeometry scale={[0.5, 0.5, 0.5]}/>
        <meshBasicMaterial toneMapped={false} {...stencil} >
          <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
        </meshBasicMaterial>
      </mesh>
    )
}