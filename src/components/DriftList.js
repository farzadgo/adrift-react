import React from 'react';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import SubHeader from './SubHeader';
import './DriftList.css';


const DriftList = ({ drifts, setToggle }) => {

  const info = { title: 'DriftList' };
  const iconProps = {
    color: 'white',
    size: 40,
    strokeWidth: 1
  };

  const DriftListItem = ({ title, time, id }) => {
    
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
        </ul>
        <Link to={`/${id}`} className="cover-arrow">
            <Icon.ChevronRight {...iconProps}/>
        </Link>
      </div>
    )
  }


  return (
    <div className="list-container">
      <SubHeader title={info.title} setToggle={setToggle}/>
      {drifts.map(item => <DriftListItem key={item.id} id={item.id} title={item.dest} time={item.date}/>)}
      <Link to="/start" className="add-btn">
        <Icon.Plus {...iconProps}/>
      </Link>
    </div>

  );
}


export default DriftList