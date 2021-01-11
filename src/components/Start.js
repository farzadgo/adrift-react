import React, { useState } from 'react';
import SubHeader from './SubHeader';
import './Start.css';
import { deconstructor } from './deconstructor';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';


const Start = ({ setToggle, addDrift }) => {

  const [inputValue, setInputValue] = useState('');
  const info = { title: 'Start' }
  let newDrift;

  // DRIFT CONSTRUCTOR
  const Drift = function(id, date, dest, stp, stp_, qs, rs, cd) {
    this.id = id;
    this.date = date;
    this.destination = dest;
    this.orgSteps = stp;
    this.newSteps = stp_;
    this.questions = qs;
    this.records = rs;
    this.completed = cd;
  }
  // DRIFT ADDER
  const createDrift = (inp) => {
    const dirObj = deconstructor(inp);
    if (!!Object.values(dirObj).every(item => item)) {
      // console.log(dirObj.orgDirs);
      // const driftLength = dirObj.orgDirs
      // ID
      // data.drifts.length == 0 ? ID = 0 : ID = data.drifts[data.drifts.length - 1].id + 1;
      let id = uuidv4();
      // DATE
      const ts = new Date();
      let date = ts.toLocaleString();
      // DEST
      let dest = dirObj.destination;
      // ORIGINAL STEPS
      let sourceSteps = dirObj.orgDirs;
      // NEW STEPS
      let lostSteps = dirObj.newDirs;
      // QUESTIONS
      let questions = dirObj.questions;
      // RECORDINGS
      let recordings = [];
      // V2. WE CAN RECORD AS MUCH AS WE LIKE
      // recordings.length = dirObj.newDirs.dirArr.length;
      // COMPLETED
      // let completed = new Array(dirObj.orgDirs.length);
      let completed = new Array(dirObj.orgDirs.length).fill(false);

      newDrift = new Drift(id, date, dest, sourceSteps, lostSteps, questions, recordings, completed);

      // /*>> adrift v1 (alpha) <<*/
      // data.drifts.push(newDrift);
      // return newDrift

      // /*>> adrift react dev <<*/
      // /* to use this you need {drifts, setDrifts} in the props*/
      // setDrifts([...drifts, newDrift]);

      /*>> adrift db version (beta) <<*/
      addDrift(newDrift);
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
      createDrift(inputValue);
      if (newDrift) {
        history.push(`/${newDrift.id}`);
      } else {
        // history.push(`/`);
      }
    }
    return (
      <button 
        type="button"
        onClick={handleClick}
        className="btn-big lost-btn"
        disabled={!inputValue ? true : false}>
        Get Lost
      </button>
    );
  }

  return (
    <div className="start">
      <SubHeader title={info.title} setToggle={setToggle}/>
      <textarea
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        className="input"
        placeholder={"Type here..."}
      />
      <LostBtn />
      {/* <Link to="/" onClick={() => createDrift(inputValue)}>
        <Icon.ChevronRight />
      </Link> */}
    </div>
  )
}

export default Start