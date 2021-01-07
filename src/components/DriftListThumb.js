import React from 'react'
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';


const DriftListThumb = ({ title, time, id, completed }) => {
  const iconProps = {
    display: 'block',
    color: 'rgb(36, 36, 36)',
    size: 56,
    strokeWidth: 1
  }

  return (
    <div className="drift-cover">
      <ul className="cover-list">
        <li>{title}</li>
        <li>{time}</li>
        <li>{completed.filter(e => e !== false).length} completed / {completed.length} steps</li>
      </ul>
      <Link to={`/${id}`} className="cover-arrow">
          <Icon.ChevronRight {...iconProps}/>
      </Link>
    </div>
  )
}

export default DriftListThumb
