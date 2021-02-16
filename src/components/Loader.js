import React, { useState, useEffect } from 'react'
import * as Icon from 'react-feather'
import { Link } from 'react-router-dom'
import './Loader.css'


const Message = () => {
  const iconProps = {
    color: '#2A2726',
    size: 32,
    strokeWidth: 1
  }
  return (
    <div className="err-msg">
      <p> Invalid URL ツ </p>
      <Link to={`/`}>
        <Icon.Home {...iconProps}/>
      </Link>
    </div>
  )
}

const Spinner = () => {
  const svgProps = {
    xmlns: "http://www.w3.org/2000/svg",
    height: 60,
    width: 60,
    viewBox: "0 0 100 100",
    preserveAspectRatio: "xMidYMid"
  }
  const circleProps = {
    cx: 50,
    cy: 50,
    r: 40,
    stroke: '#2A2726',
    fill: "none",
    strokeWidth: 3,
    strokeLinecap: "square"
  }
  return (
    <>
      <svg className="spinner" {...svgProps}>
        <circle className="spinner-circle" {...circleProps} />
	    </svg>
    </>
  )
}

const Loader = () => {
  const [message, setMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(true)
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="loader">
      { message === false ? <Spinner /> : <Message /> }
    </div>
  )
}

export default Loader