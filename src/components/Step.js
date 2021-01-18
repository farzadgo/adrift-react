import React from 'react'
import { useParams } from 'react-router-dom'
import Header from './Header'
import Sorry from './Sorry'
import * as Icon from 'react-feather'
import './Step.css'

const Step = ({ drifts, setToggle }) => {

  // const [done, setDone] = useState(drift.completed);
  let drift, step;
  const info = { title: 'Step' };
  const { id, stepIndex } = useParams();
  // console.log(id, stepIndex);

  // IMPORTANT
  if (drifts.length !== 0) {
    drift = drifts.filter(item => item.id === id)[0];
    step = drift.steps[stepIndex - 1];
  }
  // console.log(step);
  
  const Content = () => {
    return (
      <div className="step">
        <p className="step-item"> {step.newDir} </p>
        <p className="step-item"> {step.question} </p>

        <RecordBtn />
        <StopBtn />

        {/* <div className="step-item">
          <audio className="audio-player" controls></audio>
        </div> */}

        {/* <button className="button txt next-button" disabled>
          ${emptyIndex == obj.records.length - 1 ? `Finish` : `Next`}
        </button> */}
      </div>
    )
  }


  const RecordBtn = () => {
    const handleClick = () => {
      console.log('record');
    }
    return (
      <>
        <button className="btn-big record-btn" onClick={handleClick} disabled> <Icon.Mic /> </button>
      </>
    )
  }


  const StopBtn = () => {
    const handleClick = () => {
      console.log('stop');
    }
    return (
      <>
        <button className="btn-big stop-btn" onClick={handleClick} disabled> stop </button>
      </>
    )
  }

  
  return (
    <>
      <Header title={info.title} stepId={id} setToggle={setToggle}/>
      {drift ? <Content drift={drift}/> : <Sorry />}
    </>
  )
}

export default Step
