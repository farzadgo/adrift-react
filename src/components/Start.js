import React, { useState } from 'react';
import SubHeader from './SubHeader';
import './Start.css';
import { deconstructor } from './deconstructor';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';


const Start = ({ setToggle, passData }) => {

  const [inputValue, setInputValue] = useState('');
  const info = { title: 'Start' }
  let newDrift;

  const Drift = function(id, date, dest, stp, stp_, qs, rs) {
    this.id = id;
    this.date = date;
    this.dest = dest;
    this.srcSteps = stp;
    this.lstSteps = stp_;
    this.questions = qs;
    this.records = rs
  }

  const addDrift = (inp) => {
    const dirObj = deconstructor(inp);
    if (!!Object.values(dirObj).every(item => item)) {
      // ID
      // data.drifts.length == 0 ? ID = 0 : ID = data.drifts[data.drifts.length - 1].id + 1;
      let id = uuidv4();
      // DATE
      const ts = new Date();
      let date = ts.toLocaleString();
      // DEST
      let dest = dirObj.destination;
      // ORIGINAL STEPS
      let sourceSteps = dirObj.orgDirs.dirStr;
      // NEW STEPS
      let lostSteps = dirObj.newDirs.dirStr;
      // QUESTIONS
      let questions = dirObj.questions;
      // RECORDINGS
      let recordings = [];
      recordings.length = dirObj.newDirs.dirArr.length;
  
      newDrift = new Drift(id, date, dest, sourceSteps, lostSteps, questions, recordings);

      // /*>> adrift v1 (alpha) <<*/
      // data.drifts.push(newDrift);
      // return newDrift

      // /*>> adrift react dev <<*/
      // /* to use this you need {drifts, setDrifts} in the props*/
      // setDrifts([...drifts, newDrift]);

      /*>> adrift db version (beta) <<*/
      passData(newDrift);
      setInputValue("");

    } else {
      alert("Wrong direction text format \nCheck the instructions please 🙄");
      setInputValue("");
      // return
    }
  }


  const LostBtn = () => {
    const history = useHistory();
    const handleClick = () => {
      addDrift(inputValue);
      
      if (newDrift) {
        history.push(`/${newDrift.id}`);
      } else {
        // history.push(`/`);
      }
    }
    return (
      <button type="button" onClick={handleClick} className="lost-btn" disabled={!inputValue ? true : false}>
        Get Lost
      </button>
    );
  }


  return (
    <div className="start-page">
      <SubHeader title={info.title} setToggle={setToggle}/>
      <textarea
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        className="input"
        placeholder={"Type here..."}
      />
      <LostBtn />
      {/* <Link to="/" onClick={() => addDrift(inputValue)}>
        <Icon.ChevronRight />
      </Link> */}

    </div>
  )
}

export default Start