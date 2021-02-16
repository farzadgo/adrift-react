import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import * as Icon from 'react-feather'
import Header from './Header'
import './DriftList.css'


const DriftThumb = ({ id, title, time, steps }) => {
  const history = useHistory();
  const iconProps = {
    color: '#2A2726',
    size: 36,
    strokeWidth: 1
  }
  const handleClick = () => {
    history.push(`/${id}`);
  }
  return (
    <div className="drift-thumb" onClick={handleClick}>
      <ul className="drift-thumb-list">
        <li><span> destination </span>{title}</li>
        <li> {time} </li>
        <li>
          <span> steps completed </span>
          {steps.filter(e => e.completed.length).length} / {steps.length}
        </li>
      </ul>
      {/* <Link to={`/${id}`} className="drift-thumb-arrow">
          <Icon.ChevronRight {...iconProps}/>
      </Link> */}
      <div className="drift-thumb-arrow">
        <Icon.ChevronRight {...iconProps}/>
      </div>
    </div>
  )
}


const DriftList = ({ drifts, setToggle }) => {
  const info = { title: 'DriftList' };
  const iconProps = {
    color: 'white',
    size: 42,
    strokeWidth: 1
  }

  return (
    <>
      <Header info={info} setToggle={setToggle}/>
      <div className="body">

        <div className="drift-list">
        { drifts.length ?
          drifts.map(e => 
            <DriftThumb
              key={e.id}
              id={e.id}
              title={e.dest}
              time={e.date}
              steps={e.steps}
            />) :
          <div className="drift-empty">
            <p> You have not performed any drifts yet </p>
            <p> click + button to start </p>
          </div> }
        </div>

        <div className="buttons">
          <Link className="btn-big add-btn" to="/start">
            <Icon.Plus {...iconProps}/>
          </Link>
        </div>

      </div>
    </>

  );
}

export default DriftList