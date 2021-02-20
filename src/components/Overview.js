import React, { useState, useEffect } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import Header from './Header'
import Loader from './Loader'
import * as Icon from 'react-feather'
import './Overview.css'


const DeleteBtn = ({ id, deleteDrift }) => {
  const iconProps = {
    color: 'white',
    size: 32,
    strokeWidth: 1
  }
  const history = useHistory();
  const handleClick = () => {
    deleteDrift(id);
    history.push("/");
  }
  return (
    <button
      type="button"
      className="btn-big delete-btn"
      onClick={handleClick}
    >
      <Icon.Trash {...iconProps}/>
    </button>
  );
}


const ProceedBtn = ({ id, completed }) => {
  let btnText;
  const history = useHistory();
  const currentStep = completed.findIndex(e => !e.length) + 1;
  if (currentStep === 0) {
    btnText =  'Completed'
  } else if (currentStep === 1) {
    btnText =  'Start'
  } else {
    btnText =  'Continue'
  }
  const handleClick = () => {
    history.push(`/${id}/${currentStep}`);
  }
  return (
    <button
      type="button"
      className="btn-big proceed-btn"
      onClick={handleClick}
      disabled={btnText === 'Completed'}>
      <span> {btnText} </span>
    </button>
  )
}


const StepThumb = ({ id, index, step }) => {
  const { orgDir, newDir, completed } = step;
  const iconProps = {
    color: '#2A2726',
    size: 32,
    strokeWidth: 1
  }
  return (
    <div className="step-thumb">
      <span className="step-thumb-item"> {orgDir} </span>
      <span className="step-thumb-item"> {newDir} </span>
      <Link
        to={`/${id}/${index + 1}`}
        className={completed.length ? "step-thumb-arrow" : "step-thumb-arrow deactive"}>
        <Icon.ChevronRight {...iconProps}/>
      </Link>
    </div>
  )
}


const Overview = ({ drifts, setToggle, deleteDrift }) => {
  
  const { driftId } = useParams();
  const [drift, setDrift] = useState('');
  const [steps, setSteps] = useState([]);
  const [dest, setDest] = useState('');
  const [completed, setCompleted] = useState([]);

  const info = {
    title: 'Overview',
    destination: dest
  }

  const getValues = () => {
    let arr = [];
    let dft = drifts.filter(item => item.id === driftId)[0];
    if (dft) {
      setDrift(dft);
      setDest(dft.dest);
      setSteps(dft.steps);
      dft.steps.forEach(e => arr = [...arr, e.completed]);
      setCompleted(arr);
    }
  }

  useEffect(() => {
    getValues();
    console.log('render Overview...');
    return () => console.log('unmounting Overview...');
  }, [setToggle]);

  return (
    <>
      <Header info={info} setToggle={setToggle} />
      {drift ?
      <div className="body">
        <div className="steps-list">
          {steps.map((e, i) =>
            <StepThumb id={driftId} key={i} index={i} step={e} />
          )}
        </div>
        <div className="buttons">
          <DeleteBtn id={driftId} deleteDrift={deleteDrift} />
          <ProceedBtn id={driftId} completed={completed} />
        </div>
      </div> :
      <Loader />
      }
    </>
  )
}

export default Overview
