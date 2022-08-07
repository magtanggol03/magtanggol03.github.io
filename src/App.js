import './App.scss';
import React, { useLayoutEffect, useState, Suspense } from "react";

//Components
// import Model from "./components/models/model"
import Content from "./components/content"
import Camera from "./components/camera"
import Base from "./components/models/base"
import AboutMe from "./components/models/aboutme"
import Geo from "./components/models/geo"
import Tech from "./components/models/tech"
import Games from "./components/models/games"
import Dancing from "./components/models/dancing"

// R3F
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Environment, Loader} from "@react-three/drei";


import { Link } from "react-router-dom";

import { EffectComposer,  Noise, SMAA } from '@react-three/postprocessing'


const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 10, 5]} intensity={1}  />
      <directionalLight
        position={[-1, 10, -1]}
        intensity={1}
      />
    </>
  );
};

const Footer = ({color, section}) => {

  const [hovered, setHovered] = useState(false)

  const defaultStyle = {
    color: color,
    backgroundColor: '#fff9f2',
    transform: 'translate(0px, 0px)',
    boxShadow: `5px -5px 0px 0px ${color}`,
  }

  const hoveredStyle = {
    transform: 'translate(-4px, -4px)',
    boxShadow: '5px 5px 0px 0px #fff9f2',
    backgroundColor:  color,
    color: '#fff9f2',
  }

  return (
    <>
      <div
        style={{
        position: 'fixed',
        width: "100vw",
        height: "3vh",
        bottom: "0px",
        backgroundColor: color,
        zIndex: 999,
        transition: "background-color 0.5s",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: "0vw 1vw"
      }}>
        <span style={{color: '#fff9f2'}}>
          MAGTANGGOLDG
        </span>

        <Link 
          to="/portfolio" 
          className="link"
          onMouseEnter={()=>setHovered(true)}
          onMouseLeave={()=>setHovered(false)}
          style={hovered ? hoveredStyle : defaultStyle}
        > 
          <strong>Portfolio ⇀ </strong>
        </Link>
      </div>
    </>
  )
}

const Post = () =>{
  return(
    <>
      <Noise opacity={0.05} /> 
      <SMAA />
    </>
  )
}

export default function App() {
  const [width, height] = useWindowSize();

  let size
  if ( width < 400){
      size = 'xs'
  } else if (width < 500){
      size = 's'
  } else if (width <  769){
      size = 'm'
  } else if (width < 1025){
      size = 'l'
  } else {
      size = 'xl'
  }
  
  const sectionColor = [
    [153, 10, 10],
    [13, 48, 36],
    [98, 122, 127],
    [21, 42, 61],
    [171, 11, 11],
  ]

  const getBreak = (s) => {
    const breaks = [0.15, 0.25, 0.6, 0.7, 0.9]
    const dist = breaks.map((d)=>Math.abs(s-d))
    const min = Math.min(...dist)

    return dist.indexOf(min)
  }

  return (
    <>
      <Canvas >
      <Suspense fallback={ null }>
        <EffectComposer>
          <Post />
          <Lights />
          <Environment preset="warehouse"/>
          <ScrollControls pages={6} damping={2}>
              <Base colors={sectionColor} getBreak={getBreak} />  
              <AboutMe size={size}/>
              <Geo size={size}/>
              <Tech />
              <Games />
              <Dancing getBreak={getBreak} />
            <Camera size={size} getBreak={getBreak} />
             <Content getBreak={getBreak} size={size} />
          </ScrollControls>
        </ EffectComposer >
        </Suspense>
      </Canvas>
      <Loader 
        containerStyles={{
          backgroundColor: '#fff9f2',
          color: '#1d1e1f'
        }}
        innerStyles={{
          backgroundColor: '#fff9f2',
          height:'10px'
        }}
        barStyles={{
          height: '10px',
          backgroundColor:'#A72331'
        }}
        dataStyles={{
          color: '#1d1e1f',
          font: 'Archivo'
        }}
      />
      <Footer color={'#1d1e1f'} />
    </>
  );
}
