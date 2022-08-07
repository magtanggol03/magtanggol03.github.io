import React from "react";
import { useScroll, Html  } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import lerp from "lerp";
import useRefs from 'react-use-refs'

export default function Content({colors, getBreak, size, ...props}) {
    const scroll = useScroll()
    const [refOne, refTwo, refThree, refFour, refFive, refSix] = useRefs()

    const params = {
      'xl':{
        'position': [[2.55, 2.7, -4.45], [.7, 4.4, -4.45], [-3.5, 3.5, 1.3], [-3.76, 3.8, -1.5], [-4, 5.7, 0], [5, 0.8, -3.9]],
        'divStyle': [
            { },
            { },
            { textAlign: 'right'},
            { },
            { textAlign: 'left'},
            { textAlign: 'right', display: 'flex', flexDirection: 'row', alignItems: 'flex-end'},
          ],
        'scale': [0.09, 0.17, 0.15, 0.2, 0.4, 0.5]
        },
      'l':{
        'position': [[2.57, 2.75, -4.45], [1, 4.4, -4.45], [-3.5, 3.2, 1.1], [-3.76, 3.8, -1.5], [-4, 5.7, 0], [5.6, -0.1, -1.3]],
        'divStyle': [
          { },
          { },
          { textAlign: 'right'},
          { },
          { },
          { textAlign: 'right', display: 'flex', flexDirection: 'row', alignItems: 'flex-end'},
        ],

        'scale': [0.11, 0.25, 0.13, 0.24, 0.5, 0.5]
        },
      'm':{
        'position': [[1.15, 3.3, -4.45], [1, 4.25, -4.45], [-3.5, 3.2, 1.1], [-3.76, 3.6, -1.45], [-1.5, 7, 0], [4.8, 0.1, -0.1]],
        'divStyle': [
          { },
          { },
          { textAlign: 'right'},
          { },
          { textAlign: 'left'},
          { textAlign: 'right', display: 'flex', flexDirection: 'row', alignItems: 'flex-end'},
        ],

        'scale': [0.13, 0.25, 0.13, 0.21, 0.5, 0.5]
        },
      's':{
        'position': [[1.5, 4, -4], [-1.5, 6.1, -4.45], [-3.5, 3.5, 1.8], [-3.76, 3.98, -1.3], [-4.5, 10, -4.5], [5.5, 1.8, 0.7]],
        'divStyle': [
          { textAlign: 'left'},
          { textAlign: 'left'},
          { textAlign: 'right'},
          { textAlign: 'left'},
          { textAlign: 'left'},
          { textAlign: 'right', display: 'flex', flexDirection: 'row', alignItems: 'flex-end'},
        ],
        'scale': [0.3, 0.3, 0.22, 0.28, 1, 1]
        },
        'xs':{
          'position': [[1.5, 4, -4], [-1.45, 6, -4.45], [-3.5, 3.3, 1.8], [-3.76, 4, -1.35], [-4.5, 10, -4.5], [3.8, 1.8, -1.0]],
          'divStyle': [
            { textAlign: 'left'},
            { textAlign: 'left'},
            { textAlign: 'right'},
            { textAlign: 'left'},
            { textAlign: 'left'},
            { textAlign: 'right', display: 'flex', flexDirection: 'row', alignItems: 'flex-end'},
          ],
          'scale': [0.3, 0.28, 0.2, 0.28, 0.9, 1]
          }
    }
    
    useFrame(()=>{
      const section = getBreak(scroll.offset)
      if(refOne.current){
        refOne.current.style.opacity = lerp(refOne.current.style.opacity, section === 0 ? 1 : 0, 0.2)
        refOne.current.style.visibility = section === 0 ? 'visible' : 'hidden'
        refOne.current.style.transition = "all 0.5s ease-out"
        refOne.current.style.transform = section === 0 ? "translateX(0vw)": "translateX(100vw)"
      }
      if(refTwo.current){
        refTwo.current.style.opacity = lerp(refTwo.current.style.opacity, section === 1 ? 1 : 0, 0.1)
        refTwo.current.style.visibility = section === 1 ? 'visible' : 'hidden'
        refTwo.current.style.transition = "all 0.5s ease-out"
        refTwo.current.style.transform = section === 1 ? "translateY(0vh)": "translateY(-100vh)"
      }
      if(refThree.current){
        refThree.current.style.opacity = lerp(refThree.current.style.opacity, section === 2 ? 1 : 0, 0.2)
        refThree.current.style.visibility = section === 2 ? 'visible' : 'hidden'
        refThree.current.style.transition = "all 0.5s ease-out"
        refThree.current.style.transform = section === 2 ? "translateX(0vw)": "translateX(-50vw)"
      }
      if(refFour.current){
        refFour.current.style.opacity = lerp(refFour.current.style.opacity, section === 3 ? 1 : 0, 0.2)
        refFour.current.style.visibility = section === 3 ? 'visible' : 'hidden'
        refFour.current.style.transition = "all 0.5s ease-out"
        refFour.current.style.transform = section === 3 ? "translateX(0vw)": "translateX(30vw)"
      }
      if(refFive.current){
        refFive.current.style.opacity = lerp(refFive.current.style.opacity, section === 4 ? 1 : 0, 0.2)
        refFive.current.style.visibility = section === 4 ? 'visible' : 'hidden'
        refFive.current.style.transition = "all 0.5 ease-out"
        refFive.current.style.transform = section === 4 ? "translateX(0vw)": "translateX(50vw)"
      }
      if(refSix.current){
        refSix.current.style.opacity = lerp(refSix.current.style.opacity, section === 4 ? 1 : 0, 0.2)
        refSix.current.style.visibility = section === 4 ? 'visible' : 'hidden'
        refSix.current.style.transition = "all 0.5 ease-out"
        refSix.current.style.transform = section === 4 ? "translateX(0vw)": "translateX(-50vw)"
      }
    }, [])

  return(
    <>
    <Html transform occlude 
      scale={params[size].scale[0]} 
      position={params[size].position[0]} 
      ref={refOne}
      style={{display: 'block'}}
      >
      <div className='section' style={params[size].divStyle[0]}>
        <h1 >Hi, {size === 's' || size === 'xs' ? <br/> : null}I'm Ram!</h1>
        <span style={{marginBottom: "0.5rem"}}>
          Geospatial data guy and entrepreneur by trade,
        </span>
        <span >
          <strong>3D Artist</strong> and <strong>Motion Designer</strong> at heart.
        </span>
      </div>
    </Html>

    <Html 
      transform occlude
      scale={params[size].scale[1]} 
      position={params[size].position[1]} 
      ref={refTwo}>
      <div className='section' style={params[size].divStyle[1]}>

        <h1 style={{marginBottom: size === 'xl' || size ==='l' ? "-1.8rem" : "0rem" }}>GeoViz</h1>
        <span style={{marginBottom: "20px"}}>
          ...was my gateway to 3D. 
        </span>
        <span style={{marginBottom: "0px"}}>
          The first time I opened Blender was <br/>to follow a <a style={{color:"#406A53"}}href="https://somethingaboutmaps.wordpress.com/2017/11/16/creating-shaded-relief-in-blender/">tutorial</a> on how to make <br/><strong>relief maps using elevation satellite imagery</strong>.
        </span>
      </div>
    </Html>

    <Html 
    transform
    scale={params[size].scale[2]} 
    position={params[size].position[2]} 
    rotation={[0, Math.PI/2, 0]}
    ref={refThree}>
      <div className='section' style={params[size].divStyle[2]}>
        <span style={{marginBottom: size === 's' || size === 'xs'  ? "2rem" : "2rem"}}>From there,<br/>it was a rabbit hole down the </span>
        <h1 style={{marginBottom: size === 's' || size === 'xs' ? "1.5rem" : "2rem", lineHeight: size === 's' || size === 'xs' ? "3rem" :'4rem'}}> 
        3D Tech<br/>Space!</h1>
        <span style={{marginBottom: "20px"}}>
          I loved learning all about<br/><strong>modelling software, photoscanning,<br/>motion capture, AI assisted VFX,<br/>game engines, printing hardware</strong><br/>and everything in between!
        </span>
        <span style={{marginBottom: "5px"}}>
          Inspirations include:
        </span>
        <span style={{marginBottom: "10px", color:'#C1C7CA'}}>
        <a href='https://www.corridordigital.com/'>Corridor [VFX]</a>
        <br/> 
        <a href='https://polygonrunway.com/'>Polygon Runway [Blender]</a>
        <br/> 
        <a href='https://www.youtube.com/c/CGMatter'>CG Matter [Blender]</a>
        <br/> 
        <a href='https://www.youtube.com/channel/UCbmxZRQk-X0p-TOxd6PEYJA'>Ian Hubert [VFX]</a>
        <br/>
        <a href='https://threejs-journey.com/#'>Bruno Simon [ThreeJS]</a>
        <br/>
        <a href='https://github.com/pmndrs'>Poimandres [R3F]</a>
        </span>
        
      </div>
    </Html>
    <Html 
      transform 
      scale={params[size].scale[3]} 
      position={params[size].position[3]} 
      rotation={[0, Math.PI/2, 0]}
      ref={refFour}>
      <div className="section" style={params[size].divStyle[3]}>
        <h1 style={{lineHeight: size === 's' || size === 'xs'|| size === 'm' ? "2rem" :"8rem"}}>Games,</h1>
        <span style={{marginBottom: size === 's' || size === 'xs' ? "10px" : "20px"}}>
          while mostly a time sink,<br/>is my main inspiration.
        </span>
        <span>
          Most of my projects are just<br/>fan art of my favorite franchises -<br/><strong>Final Fantasy, Persona, Star Wars,</strong><br/>and so many others!
        </span>
      </div>
    </Html>
    <Html 
      transform sprite
      scale={params[size].scale[4]} 
      position={params[size].position[4]} 

      ref={refFive} >
      <div className="section" style={params[size].divStyle[4]}>
        <h1 style={{lineHeight: size === 's' || size === 'xs' ? "3rem" : "5rem", marginBottom: "1rem"}}>Let's work<br/>together!</h1>
        <span style={{marginBottom: "20px"}}>
          I love learning new things, so reach out <br/>if you have anything interesting in mind!
        </span>
        <span style={{marginBottom: "20px"}}>
          <strong>hello@magtanggoldg.com | @magtanggoldg </strong>
        </span>
      </div>
    </Html>

    <Html
      transform sprite
      scale={params[size].scale[5]} 
      position={params[size].position[5]} 
      ref={refSix}
      >
      <div className='section' style={params[size].divStyle[5]}>
        <span><strong>Check out my work<br/>in the link below!</strong></span>
      </div>
    </Html>
    </>
  )

}