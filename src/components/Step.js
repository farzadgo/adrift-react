import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useReactMediaRecorder } from 'react-media-recorder'
import Header from './Header'
import Loader from './Loader'
import * as Icon from 'react-feather'
import './Step.css'


const NextBtn = ({ stepIndex, driftId , driftLength, checkStep }) => {
  let lastStep;
  let btnText;
  const currentIndex = parseInt(stepIndex);
  currentIndex === driftLength ? lastStep = true : lastStep = false;
  const history = useHistory();
  const handleClick = () => {
    checkStep(driftId, stepIndex);
    const nextIndex = currentIndex + 1;
    if (lastStep) {
      history.push(`/${driftId}`);
    } else {
      history.push(`/${driftId}/${nextIndex}`);
    }
  }
  lastStep ? btnText = 'Finish' : btnText = 'Next';

  return (
    <button
      className="btn-big next-btn"
      type="button"
      onClick={handleClick}
    >
      <span> {btnText} </span>
    </button>
  )
}


const RecordThumb = ({ index, blob, deleteRecording, driftId, stepIndex }) => {
  const iconProps = {
    color: '#2a2726',
    size: 24,
    strokeWidth: 2
  }
  const audioURL = URL.createObjectURL(blob);
  const handleDelete = () => {
    deleteRecording(index, driftId, stepIndex);
  }
  return (
    <div className="record-thumb">
      <audio
        className="audio-player"
        src={audioURL}
        controls
        controlsList="nodownload">  
      </audio>
      <a
        className="record-thumb-btn"
        href={audioURL}
        download={`adrift_${driftId}_step_${index}.wav`}
      >
        <Icon.Download {...iconProps} />
      </a>
      <button
        className="record-thumb-btn"
        onClick={handleDelete}
      >
        <Icon.Trash {...iconProps} />
      </button>
    </div>
  )
}


const Recorder = ({ driftId, stepIndex, addRecording }) => {
  const iconProps = {
    size: 28,
    strokeWidth: 0,
    fill: '#2A2726'
  }
  const handleBlob = (url, blob) => {
    addRecording(blob, driftId, stepIndex);
  }
  const {
    status,
    startRecording,
    stopRecording,
    // mediaBlobUrl,
  } = useReactMediaRecorder({
    video: false,
    onStop: (blobUrl, blob) => handleBlob(blobUrl, blob)
  });
  let recColor;
  status === 'recording' ? recColor = '#DC143C' : recColor = '#2A2726';

  return (
    <div className="step-controls">
      <button
        className="record-btn"
        onClick={startRecording}
        style={{borderColor: recColor}}
      >
        <Icon.Circle {...iconProps} fill={recColor}/>
      </button>
      <button
        className="stop-btn"
        onClick={stopRecording}
        disabled={status !== 'recording'}
      >
        <Icon.Square {...iconProps}/>
      </button>
    </div>
  )
}


const Step = ({ drifts, setToggle, addRecording, deleteRecording, checkStep }) => {
  let drift, driftLength, step, direction;
  const { driftId, stepIndex } = useParams();
  if (drifts) {
    drift = drifts.filter(item => item.id === driftId)[0];
  }
  if (drift) {
    driftLength = drift.steps.length;
    step = drift.steps[stepIndex - 1];
    let newDirection = step.newDir.split(' ');
    newDirection.splice(0, 1);
    direction = newDirection.join(' ');
  }
  const info = {
    title: 'Step',
    length: driftLength
  }

  return (
    <>
      <Header info={info} setToggle={setToggle}/>
      { step ?
      <div className="body">
        <div className="step">

          <div className="step-directions">
            <p className="step-item"> {direction} </p>
            <p className="step-item"> {step.question} </p>
          </div>

          <Recorder
            driftId={driftId}
            stepIndex={stepIndex}
            addRecording={addRecording}
          />

          {step.records.length ?
          <div>
            {step.records.map((e, i) =>
              <RecordThumb
                key={i}
                index={i}
                blob={e}
                deleteRecording={deleteRecording}
                driftId={driftId}
                stepIndex={stepIndex}
              />
            )}
          </div> :
          <div className="no-records">
            <p> No recordings here ツ </p>
          </div>
          }

        </div>

        <div className="buttons">
          {!step.completed.length &&
            <NextBtn
              stepIndex={stepIndex}
              driftId={driftId}
              driftLength={driftLength}
              checkStep={checkStep}
            />
          }
        </div>
      </div> :
      <Loader />
      }
    </>
  )
}

export default Step
