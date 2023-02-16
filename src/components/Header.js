import React from 'react'
import * as Icon from 'react-feather'
import { Link, useParams } from 'react-router-dom'
import './Header.css'

// <Link to="/" onClick={() => createDrift(inputValue)}>
//   <Icon.ChevronRight />
// </Link>

const Header = ({ info, setToggle }) => {
  let headerTitle;
  const iconProps = {
    color: '#2A2726',
    size: 28,
    strokeWidth: 1
  }
  const { driftId, stepIndex } = useParams();
  const { title, length, destination } = info;

  const LeftBtn = () => {
    let leftIcon;
    let show = true;
    let target = '/';
    switch (title) {
      case 'DriftList':
        show = false;
        headerTitle = 'Your drifts';
        break;
      case 'Audiowalk':
        leftIcon = <Icon.ChevronLeft {...iconProps}/>;
        headerTitle = 'Audio walk';
        break;
      case 'Start':
        leftIcon = <Icon.ChevronLeft {...iconProps}/>;
        headerTitle = 'Start here';
        break;
      case 'Overview':
        leftIcon = <Icon.ChevronsLeft {...iconProps}/>;
        headerTitle = destination ? `${destination}` : '';
        break;
      case 'Step':
        leftIcon = <Icon.ChevronLeft {...iconProps}/>;
        // headerTitle = length ? `Step ${stepIndex} / ${length}` : '';
        headerTitle = length ? `Step ${stepIndex}` : '';
        target = `/${driftId}`;
        break;
      default:
    }

    return (
      <Link
        to={`${target}`}
        className={show ? "header-btn left" : "header-btn left disabled"}
      >
        {leftIcon}
      </Link>
    )
  }

  const RightBtn = () => {
    return (
      <button
        className="header-btn right"
        type="button"
        aria-label="Menu"
        onClick={setToggle}
      >
        <Icon.Menu {...iconProps}/>
      </button>
    )
  }


  const HeaderTitle = () => {
    return (
      <div className="header-title">
        {headerTitle}
      </div>
    )
  }
  

  return (
    <div className="header">
      <LeftBtn />
      <HeaderTitle />
      <RightBtn />
    </div>
  )
}

export default Header
