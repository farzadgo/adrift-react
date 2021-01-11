import React from 'react'
import { useParams } from 'react-router-dom'
import SubHeader from './SubHeader'
import Sorry from './Sorry'


const Step = ({ drifts, setToggle }) => {

  let drift;
  const info = { title: 'Step' };
  const { id, step } = useParams();

  // IMPORTANT
  if (drifts.length !== 0) {
    drift = drifts.filter(item => item.id === id)[0];
  }
  
  
  const Content = () => {
    return (
      <>
        <div className="step-item">
          <p> {drift.orgSteps[step]} </p>
          <p> {drift.questions[step]} </p>
        </div>

        <RecordBtn />
        <StopBtn />

        {/* <div className="step-item">
          <audio className="audio-player" controls></audio>
        </div> */}

        {/* <button className="button txt next-button" disabled>
          ${emptyIndex == obj.records.length - 1 ? `Finish` : `Next`}
        </button> */}
      </>
    )
  }


  const RecordBtn = () => {
    const handleClick = () => {
      console.log('record');
    }
    return (
      <>
        <button className="button record-button" onClick={handleClick} disabled> record </button>
      </>
    )
  }


  const StopBtn = () => {
    const handleClick = () => {
      console.log('stop');
    }
    return (
      <>
        <button className="button stop-button" onClick={handleClick} disabled> stop </button>
      </>
    )
  }

  
  return (
    <>
      <SubHeader title={info.title} stepId={id} setToggle={setToggle}/>
      {drift ? <Content drift={drift}/> : <Sorry />}
    </>
  )
}

export default Step
