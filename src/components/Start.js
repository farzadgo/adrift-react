import React, { useState } from 'react'
import Header from './Header'
import './Start.css'
import { deconstructor } from './deconstructor'
import { v4 as uuidv4 } from 'uuid'
import { useHistory } from 'react-router-dom'


const Start = ({ setToggle, addDrift }) => {

  const [inputValue, setInputValue] = useState('');
  const info = { title: 'Start' }
  let newDrift;

  // DRIFT CONSTRUCTOR
  const Drift = function(id, date, dst, stps) {
    this.id = id;
    this.date = date;
    this.dest = dst;
    this.steps = stps;
  }
  // DRIFT ADDER
  const createDrift = (inp) => {
    const dirObj = deconstructor(inp);
    if (!!Object.values(dirObj).every(item => item)) {
      // ID
      const id = uuidv4();
      // DATE
      let options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      const date = new Date().toLocaleString('en-DE', options)

      newDrift = new Drift(id, date, dirObj.dest, dirObj.steps);

      // >> adrift v1 (alpha) <<
      // data.drifts.push(newDrift);
      // return newDrift

      // >> adrift react dev <<
      // setDrifts([...drifts, newDrift]);

      // >> adrift db version (beta) <<
      addDrift(newDrift);
      setInputValue("");

    } else {
      alert("Wrong direction text format \nCheck the instructions please 🙄");
      setInputValue("");
    }
  }


  const LostBtn = () => {
    const history = useHistory();
    const handleClick = () => {
      createDrift(inputValue);
      if (newDrift) {
        history.push(`/${newDrift.id}`);
      } else {
        console.log('newDrift error');
      }
    }
    return (
      <button 
        type="button"
        className="btn-big lost-btn"
        onClick={handleClick}
        disabled={!inputValue ? true : false}>
        Get Lost
      </button>
    );
  }
  
  return (
    <>
      <Header info={info} setToggle={setToggle}/>
      <div className="body">
        <div className="start">
          <textarea
            value={inputValue}
            className="input"
            onChange={e => setInputValue(e.target.value)}
            placeholder={"Type here..."}
          />
        </div>
        <div className="buttons">
          <LostBtn />
        </div>
      </div>
    </>
  )
}

export default Start