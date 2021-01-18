import React from 'react'
import { Link } from 'react-router-dom'
import * as Icon from 'react-feather'
import Header from './Header'
// import DriftListThumb from './DriftListThumb'
import './DriftList.css'


const DriftListThumb = ({ id, title, time, steps }) => {
  const iconProps = {
    display: 'block',
    color: 'rgb(36, 36, 36)',
    size: 36,
    strokeWidth: 1
  }

  return (
    <div className="drift-thumb">
      <ul className="drift-thumb-list">
        <li>
          <span> intended destination </span> {title}
        </li>
        <li><span> time </span> {time} </li>
        <li>
          <span> steps completed </span>
          {steps.filter(e => e.completed !== false).length} / {steps.length}
        </li>
      </ul>
      <Link to={`/${id}`} className="drift-thumb-arrow">
          <Icon.ChevronRight {...iconProps}/>
      </Link>
    </div>
  )
}

const DriftList = ({ drifts, setToggle }) => {

  const info = { title: 'DriftList' };
  const iconProps = {
    color: 'white',
    size: 42,
    strokeWidth: 1
  };


  return (
    <>
      <Header title={info.title} setToggle={setToggle}/>
      <div className="drift-list">
        {drifts.map(item => 
          <DriftListThumb
            key={item.id}
            id={item.id}
            title={item.dest}
            time={item.date}
            steps={item.steps}/>
        )}
        <Link to="/start" className="btn-big add-btn">
          <Icon.Plus {...iconProps}/>
        </Link>
      </div>
    </>

  );
}


export default DriftList