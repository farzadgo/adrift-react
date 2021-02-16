import React from 'react'
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


const ProceedBtn = ({ drift }) => {
  let btnText;
  let arr = [];
  const history = useHistory();
  drift.steps.forEach(e => arr = [...arr, e.completed]);
  const currentStep = arr.findIndex(e => !e.length) + 1;
  if (currentStep === 0) {
    btnText =  'Completed'
  } else if (currentStep === 1) {
    btnText =  'Start'
  } else {
    btnText =  'Continue'
  }
  const handleClick = () => {
    history.push(`/${drift.id}/${currentStep}`);
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


const StepThumb = ({ index, orgDir, newDir, completed, id }) => {
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
  let drift, steps, dest;
  const { driftId } = useParams();
  if (drifts) {
    drift = drifts.filter(item => item.id === driftId)[0]
  }
  if (drift) {
    steps = drift.steps;
    dest = drift.dest;
  }
  const info = {
    title: 'Overview',
    destination: dest
  }

  return (
    <>
      <Header info={info} setToggle={setToggle} />
      {drift ?
      <div className="body">
        <div className="steps-list">
          {steps.map((e, i) =>
            <StepThumb
              key={i}
              index={i}
              orgDir={e.orgDir}
              newDir={e.newDir}
              completed={e.completed}
              id={driftId}
            />
          )}
        </div>
        <div className="buttons">
          <DeleteBtn id={driftId} deleteDrift={deleteDrift} />
          <ProceedBtn drift={drift} />
        </div>
      </div> :
      <Loader />
      }
    </>
  )
}

export default Overview
