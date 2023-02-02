import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import * as Icon from 'react-feather'
import Header from './Header'
import './DriftList.css'


const DriftList = ({ drifts, setToggle }) => {
  const history = useHistory();

  const info = {
    title: 'DriftList'
  };
  const iconProps = {
    color: '#F3F1F1',
    size: 32,
    strokeWidth: 1
  }

  return (
    <>
      <Header info={info} setToggle={setToggle}/>
      <div className="main">

        <div className="body">
          { drifts.length ?
            drifts.map((e, i) => 
              <DriftThumb key={i} drift={e} />) :
            <div className="drift-empty">
              <p> You have not performed any drifts yet </p>
              <p> click + button to start </p>
            </div>
          }
          <div className='ampliwalk' onClick={() => history.push('/ampliwalk')}>
            {/* <Link to="/ampliwalk">
              take an amplified walk
            </Link> */}
            take an amplified walk
          </div>
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

const DriftThumb = ({ drift }) => {
  const { id, dest, date, steps } = drift;
  const history = useHistory();
  const iconProps = {
    color: '#2A2726',
    size: 28,
    strokeWidth: 1
  }
  const handleClick = () => {
    history.push(`/${id}`);
  }
  return (
    <div className="drift-thumb" onClick={handleClick}>
      <ul className="drift-thumb-list">
        <li><span> destination </span>{dest}</li>
        <li> {date} </li>
        <li>
          <span> steps completed </span>
          {steps.filter(e => e.completed.length).length} / {steps.length}
        </li>
      </ul>
      <div className="drift-thumb-arrow">
        <Icon.ChevronRight {...iconProps}/>
      </div>
    </div>
  )
}