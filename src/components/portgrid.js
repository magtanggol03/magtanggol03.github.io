import React, {useLayoutEffect, useState, useEffect, useRef} from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useSnapshot } from 'valtio';
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { FiX } from 'react-icons/fi'
import { BsCircle, BsCircleFill } from 'react-icons/bs'
import { state } from '../utils'
import { Link } from "react-router-dom";
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import PropagateLoader from "react-spinners/PropagateLoader";
import { useSwipeable } from 'react-swipeable';



const ResponsiveGridLayout = WidthProvider(Responsive);

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

const File = ({url, scale=0.5}) => {
  const ref = useRef()
  const fileType = url ? url.split('.')[1] === 'mp4' : null
  const [loading, setLoading] = useState(true)

  const inStyle = {
    transform: "translate(-50%, -50%) scale(" + scale + ")"
  }

  const videoComp = 
    <video 
      ref={ref}
      className="portfolio-item" 
      loop 
      autoPlay={true} 
      muted="muted"
      webkit-playsinline = "true"
      playsInline
      style={inStyle} 
      onLoadedData={() => setLoading(false)}
      >
      <source src={url} type="video/mp4" />
    </video>
  
  const imageComp = <img ref={ref} src={url} style={inStyle} onLoad={() => setLoading(false)}/>

  const override = {
    display: "block",
    margin: "0 auto",
    transform: "translate(50%, 50%)",
    height: "100%"
  };

  
  return(
    <>
    <LazyLoadComponent>
    {/* <div style={{display: loading ? "block" : "none"}}>
      <h1> Loading...</h1>
    </div> */}
    <PropagateLoader loading={loading} cssOverride={override} color='#fff9f2' />
    <div style={{display: loading ? "none" : "block"}}>
        {fileType ? videoComp : imageComp}
    </div>
    </LazyLoadComponent>
    </>
  )
}

const Item = ({handleClick, index, url, cols}) => {
  const { urls } = useSnapshot(state)
  const click = () => (handleClick(index))
  const [entered, setEnter] = useState(false)
  const [transition, setTransition] = useState(false)

  const getRandom = (min, max) => (index/urls.length) * (max - min) + min;
  const duration = getRandom(1, 1.5)

  useEffect(()=>{
    setEnter(true)
  }, [])

  return (
    <>
    <div 
      className="portfolio-item-container" 
      style={{
        background: '#A72331',
        opacity: entered ? 1 : 0,
        transform: entered ? 'translate(0px, 0px)' : 'translate(0%, 200%)',
        transitionDuration: transition ? '0.3s' : `${duration}s`,
        transitionTimingFunction: 'cubic-bezier( 0.79, 0.33, 0.5, 1.4 )',
        transitionDelay: 'opacity 0.5s'
      }} 
      onClick={click}
      onTransitionEnd={()=>setTransition(true)}
    >
      <File url={url.url} scale={0.7} key={index} />
    </div>
    </>
  )
}

const Items = ({handleClick}) => {
  const { urls } = useSnapshot(state)
  const [width, height] = useWindowSize();

  const lrge = 700
  const mid = 500

  let cols = 3

  if (width < lrge) cols = 2
  if (width < mid) cols = 1

  const layouts = urls.map((u, i) => {
    return(
      {i: String(i), x: i % cols, y: Math.floor(i/cols)*2 , w: 1, h: 2, static: true}
    )
  })

  const layout = 
    {lg: layouts, md: layouts, sm: layouts}

  const children = urls.map((url, i) => {
    return (
        <div key={i}>
          <Item handleClick={handleClick} index={i+1} url={url} cols={cols}/>
        </div>    
      
    )
  });


  return(
    <>
      <ResponsiveGridLayout
        className="layout"
        style={{height: "100vh"}}
        layouts={layout}
        breakpoints={{ lg: lrge, md: mid, sm: 0}}
        cols={{ lg: 3, md: 2, sm: 1}}
        margin={[10, 10]}
      >
        {children}
      </ResponsiveGridLayout>
    </>
  )
}

const Highlight = ({handleClick, inputStyle, clicked}) => {
  const { urls } = useSnapshot(state)
  const [width, height] = useWindowSize();
  const [items, setItems] = useState([])
  const [displayed, setDisplayed] = useState(0)

  const click = () => {
    handleClick(false)
    setDisplayed(0)
    setItems([])
  }


  useEffect(()=>{
    if(urls[clicked-1] && clicked !== 0){
      const directory = `/portfolio/${urls[clicked-1].folder}/`
      const portItems = urls[clicked-1].items.map(i=>{
        return (
          `${directory}${i}`
        )
      })
      setItems(portItems)
    }
    
  }, [clicked, urls])

  const incrementClicked = () => {
    if(displayed !== items.length -1){
      setDisplayed(displayed+1)
    }
  }

  const decrementClicked = () => {
    if(displayed !== 0){
      setDisplayed(displayed-1)
    }
  }
  const miniNav = items.map((n, i)=>{
    return(
      i === displayed ? <BsCircleFill /> : <BsCircle />
    )
  })

  const inStyle = {
    transform: clicked ? "translate(0, 0%)" : "translate(0px, 20vh)",
    transition: "0.8s cubic-bezier(0.02,0.63,0.36,1)",
  }

  const finScale = width > 500 ? 1: 0.5
  const displayItems = items.map((d, i)=>{
    return (
      <File url={items[i]} scale={finScale} key={i} />
    )
  })

  const handlers = useSwipeable({
    onSwipedLeft: () => incrementClicked(),
    onSwipedRight: () => decrementClicked(),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  return (
    <div className="highlight-bg" style={inputStyle} onClick={click} >
      <div className="highlight" style={{background:'#fff9f2'}} {...handlers}> 
        <FiX onClick={click} className='exit-button' />
        {clicked && displayItems[displayed]}
        <div className='mini-nav'>
          {items.length > 1 ?  miniNav : null}
        </div>
      </div>
      <div className="title-card" style={inStyle}>
        <span className='title'> {clicked ? urls[clicked-1].title : ""} </span>
        <span className='description'> {clicked ? urls[clicked-1].description : ""} </span>
      </div>
      {displayed < items.length-1 && <MdOutlineKeyboardArrowRight className='arrow-button' onClick={incrementClicked} style={{right: '1vw'}} />}
      {displayed > 0 && <MdOutlineKeyboardArrowLeft className='arrow-button'  onClick={decrementClicked} style={{left: '1vw'}} />}
    </div>
  )
}

const Footer = ({color}) => {
  const [enter, setEnter] = useState(false)

  useEffect(()=>{
    setEnter(true)
  }, [])
  return (
    <>
      <div style={{
        position: 'absolute',
        height: '100vh',
        top: 0,
        left: 0
      }}>
        <div style={{
          position: 'fixed',
          width: "100vw",
          height: "3vh",
          bottom: "0px",
          backgroundColor: color,
          zIndex: 9999,
          transition: "background-color 0.5s",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: "0 1vw",
        }}>
          <Link to="/" style={{
            color: '#fff9f2',
            fontFamily: "Archivo",
            fontSize: "0.9rem",
            transform: enter ? 'translate(0px, 0px)' : 'translate(-100%, 0px)',
            transition: '0.5s cubic-bezier(0.02,0.63,0.36,1)'
          }}>
            <strong> ← Back </strong>
          </Link> 
          <span style={{
            color: '#fff9f2',
            transform: enter ? 'translate(-10px, 0px)' : 'translate(100%, 0px)',
            transition: '0.5s cubic-bezier(0.02,0.63,0.36,1)'
          }}>
          MAGTANGGOLDG
        </span>
        </div>
      </div>
    </>
  )
}

export default function Portfolio() {
  const [clicked, setClicked] = useState(false)
  const handleClick = (i) => { setClicked(i) }

  useEffect(()=>{
    document.body.style.background = "#fff9f2"
  }, [])
  //console.log(state.clicked)

  useEffect(()=>{
    //clicked ? document.body.style.overflowY = "hidden" : document.body.style.overflowY = "scroll"
    clicked ? document.documentElement.style.overflowY = "hidden" : document.documentElement.style.overflowY = "scroll"
  },[clicked])

    const inputStyle = {
      visibility: clicked ? "visible" : "hidden",
      opacity: clicked ? 1 : 0,
    }

  //console.log(clicked)

  return (
    <>
      <Footer color='#A82431'/>
        <Items handleClick={handleClick}/>
        <Highlight 
          inputStyle={inputStyle} 
          handleClick={handleClick}
          clicked={clicked}
        />
    </>
  );
}