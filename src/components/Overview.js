import React from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import Header from './Header'
import Sorry from './Sorry'
import './Overview.css'
import * as Icon from 'react-feather'



const Overview = ({ drifts, setToggle, deleteDrift }) => {

  // const [ open, setOpen ] = useState(false);
  let drift;
  const info = { title: 'Overview' };
  const { id } = useParams();
  // OR USE "useLocation()"

  // BE AWARE ID CREATED IN DRIFT CONSTRUTOR (drift.id)
  // MIGHT BE A "number" SO "===" TURNS FALSE AS REACT
  // CONVERTS "{ id }" TO STRING

  // IMPORTANT
  if (drifts.length !== 0) {
    drift = drifts.filter(item => item.id === id)[0];
  }

  const StepsList = ({ drift }) => {
    const { steps } = drift;
    return (
      <div className="overview">
        <div className="steps-list">
          {steps.map((e, i) =>
          <StepThumb
            key={i}
            orgDir={e.orgDir}
            newDir={e.newDir}
            question={e.question}
            completed={e.completed}/>
          )}
        </div>
        <div className="steps-btns">
          <DeleteBtn id={drift.id} />
          {/* TODO: show if there is still 'false' in completed array left */}
          <ProceedBtn drift={drift} />
        </div>
      </div>
    )
  }

  const StepThumb = ({ orgDir, newDir, completed }) => {
    const iconProps = {color: '#2a2726', size: 32, strokeWidth: 1}
    return (
      <div className="step-thumb">
        <span className="step-thumb-item"> {orgDir} </span>
        <span className="step-thumb-item"> {newDir} </span>
        <Link
          to={`/${id}`}
          className={completed ? "step-thumb-arrow" : "step-thumb-arrow deactive"}>
          <Icon.ChevronRight {...iconProps}/>
        </Link>
      </div>
    )
  }

  const DeleteBtn = ({ id }) => {
    const iconProps = {color: 'white', size: 40, strokeWidth: 1}
    const history = useHistory();
    const handleClick = () => {
      deleteDrift(id);
      history.push("/");
    }
    return (
      <button type="button" onClick={handleClick} className="btn-big delete-btn">
        <Icon.Trash {...iconProps}/>
      </button>
    );
  }

  const ProceedBtn = ({ drift }) => {
    const history = useHistory();
    const handleClick = () => {
      // console.log(drift.steps);
      let arr = [];
      drift.steps.forEach(e => arr = [...arr, e.completed]);
      const currentStep = arr.findIndex(e => e == false) + 1;
      // console.log(currentStep);
      history.push(`/${drift.id}/${currentStep}`);
      // setOpen(!open);
    }
    return (
      <button type="button" onClick={handleClick} className="btn-big proceed-btn">
        <span> Start </span>
      </button>
    );
  }


  return (
    <>
      <Header title={info.title} setToggle={setToggle}/>
      {/* { open && children } */}
      { drift ? <StepsList drift={drift}/> : <Sorry /> }
    </>
  )
}

export default Overview
