import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useReactMediaRecorder } from 'react-media-recorder'
import Header from './Header'
import Loader from './Loader'
import * as Icon from 'react-feather'
import './Step.css'


const Step = ({ drifts, setToggle, addRecording, deleteRecording, checkStep }) => {
  const { driftId, stepIndex } = useParams();
  const [step, setStep] = useState('');
  const [records, setRecords] = useState([]);
  const [stepsLength, setStepsLength] = useState(0);
  const [direction, setDirection] = useState('');
  
  const [btnStatus, setBtnStatus] = useState('set');

  const info = {
    title: 'Step',
    length: stepsLength
  }

  const getValues = () => {
    let stp;
    let dft = drifts.filter(item => item.id === driftId)[0];
    if (dft) {
      stp = dft.steps[stepIndex - 1];
      setStepsLength(dft.steps.length);
    }
    if (stp) {
      let newDir = stp.newDir.split(' ');
      newDir.splice(0, 1);
      let dir = newDir.join(' ');
      setRecords(stp.records);
      setDirection(dir);
      setStep(stp);
    }
  }

  useEffect(() => {
    getValues();
    console.log('render Step...');
    return () => console.log('unmounting Step...');
  }, [setToggle]);

  return (
    <>
      <Header info={info} setToggle={setToggle}/>
      {step ?
      <div className="main">
        <div className="body">

          <div className="step-directions">
            <p className="step-item"> {direction} </p>
            <p className="step-item"> {step.question} </p>
          </div>

          <Recorder
            driftId={driftId}
            stepIndex={stepIndex}
            addRecording={addRecording}
            setBtnStatus={setBtnStatus}
          />

          {records.length ?
          <div>
            {records.map((e, i) =>
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
            <p> No recordings yet ツ </p>
          </div>
          }

        </div>

        {!step.completed.length &&
        <div className="buttons">
          <NextBtn
            stepIndex={stepIndex}
            driftId={driftId}
            stepsLength={stepsLength}
            checkStep={checkStep}
            btnStatus={btnStatus}
          />
        </div>
        }
      </div> :
      <Loader />
      }
    </>
  )
}

export default Step

const NextBtn = ({ stepIndex, driftId , stepsLength, checkStep, btnStatus }) => {
  let lastStep;
  let btnText;
  const currentIndex = parseInt(stepIndex);
  currentIndex === stepsLength ? lastStep = true : lastStep = false;
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
      disabled={btnStatus ? false : true}
    >
      <span> {btnText} </span>
    </button>
  )
}


const Recorder = ({ driftId, stepIndex, addRecording, setBtnStatus }) => {
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
  })

  let recProps;
  const iconProps = {
    size: 24,
    strokeWidth: 0,
  }
  
  if (status !== 'recording') {
    iconProps.fill = '#2A2726';
    setBtnStatus('set');
    recProps = {
      icon: <Icon.Circle {...iconProps} />,
      onClick: startRecording,
    }
  } else {
    setBtnStatus('');
    iconProps.fill = '#DC143C';
    recProps = {
      icon: <Icon.Square {...iconProps} />,
      onClick: stopRecording,
      style: {borderColor: iconProps.fill}
    }
  }

  return (
    <div className="step-recorder">
      <button
        className="recorder-btn"
        onClick={recProps.onClick}
        style={recProps.style}
      >
        {recProps.icon}
      </button>
    </div>
  )
}


const RecordThumb = ({ index, blob, deleteRecording, driftId, stepIndex }) => {
  const iconProps = {
    color: '#2A2726',
    size: 28,
    strokeWidth: 1
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