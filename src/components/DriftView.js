import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import SubHeader from './SubHeader';
import './DriftView.css';
import * as Icon from 'react-feather';


const DriftView = ({ drifts, setToggle, passData }) => {

  let drift;
  const info = { title: 'DriftView' };
  const { id } = useParams();
  // OR USE "useLocation()"

  // BE AWARE ID CREATED IN DRIFT CONSTRUTOR (drift.id)
  // MIGHT BE A "number" SO "===" TURNS FALSE AS REACT
  // CONVERTS "{ id }" TO STRING
  if (drifts.length !== 0) {
    drift = drifts.filter(item => item.id === id)[0];
  }
  
  const Sorry = () => {
    return (
      <>
        <p>Sorry :(</p>
        <p>Please go back</p>
      </>
    )
  }

  const StepsList = ({ drift }) => {
    return (
      <>
        <p>{drift.date}</p>
        <p>{drift.dest}</p>
        <p>{drift.srcSteps}</p>
        <p>{drift.lstSteps}</p>
      </>
    )
  }

  const DeleteBtn = ({ id }) => {
    const iconProps = {
      color: 'white',
      size: 40,
      strokeWidth: 1
    }
    const history = useHistory();
    const handleClick = () => {
      passData(id);
      history.push("/");
    }
    return (
      <button type="button" onClick={handleClick} className="lost-btn">
        <Icon.Trash {...iconProps}/>
      </button>
    );
  }


  return (
    <div className="view-page">
      <SubHeader title={info.title} setToggle={setToggle}/>
      {drift ? <StepsList drift={drift}/> : <Sorry />}
      {drift ? <DeleteBtn id={drift.id}/> : null }
    </div>
  )
}

export default DriftView
