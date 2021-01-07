import React from 'react';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import SubHeader from './SubHeader';
import DriftListThumb from './DriftListThumb';
import './DriftList.css';



const DriftList = ({ drifts, setToggle }) => {

  const info = { title: 'DriftList' };
  const iconProps = {
    color: 'white',
    size: 40,
    strokeWidth: 1
  };


  return (
    <div className="list-container">
      <SubHeader title={info.title} setToggle={setToggle}/>
      {drifts.map(item => 
        <DriftListThumb
          key={item.id}
          id={item.id}
          title={item.destination}
          time={item.date}
          completed={item.completed}/>
      )}
      <Link to="/start" className="add-btn">
        <Icon.Plus {...iconProps}/>
      </Link>
    </div>

  );
}


export default DriftList