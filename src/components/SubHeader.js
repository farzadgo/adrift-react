import React from 'react';
import './SubHeader.css';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';


const SubHeader = ({ title, setToggle }) => {

  const iconProps = {
    color: 'rgb(36, 36, 36)',
    size: 36,
    strokeWidth: 1
  }

  const LeftBtn = ({ title }) => {
    let target = '/';
    let show = true;
    let icon;
    switch (title) {
      case 'DriftList':
        // console.log('LeftBtn case_1');
        target = null;
        show = false;
        icon = null;
        break;
      case 'Start':
        // console.log('LeftBtn case_2');
        icon = <Icon.ChevronLeft {...iconProps}/>;
        break;
      case 'DriftView':
        // console.log('LeftBtn case_3');
        icon = <Icon.ChevronsLeft {...iconProps}/>;
        break;
      default:
        console.log('LeftBtn case_default');
    }
    return (
      <Link to={`${target}`} className={show ? "sub-link" : "sublink hidden"} >
        {icon}
      </Link>
    )
  }

  const RightBtn = ({ setToggle }) => {
    return (
      <button className="sub-btn" onClick={setToggle}>
        <Icon.Menu {...iconProps}/>
      </button>
    )
  }

  
  return (
    <div className="sub-header">
      <LeftBtn title={title}/>
      <p className="sub-title">{title}</p>
      <RightBtn setToggle={setToggle}/>
    </div>
  )
}

export default SubHeader
