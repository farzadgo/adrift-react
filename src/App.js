import React, { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Dexie from 'dexie'
import DriftList from "./components/DriftList"
import Start from "./components/Start"
import Overview from "./components/Overview"
import Step from "./components/Step"
import Menu from "./components/Menu"
import './App.css'


const App = () => {
  
  const db = new Dexie('adriftDB');
  db.version(1).stores({ drifts: "id, date, dest, steps" });
  db.version(2).stores({ drifts: "id, date, dest, steps" });
  db.open().catch((err) => console.log(err.stack || err));

  const [toggle, setToggle] = useState(false);
  const [drifts, setDrifts] = useState([]);
  const [winSize, setWinSize] = useState({
    height: window.innerHeight, width: window.innerWidth
  });

  const toggler = () => setToggle(prev => !prev);

  const checkStep = async (id, step) => {
    db.drifts.filter(e => e.id === id).modify(dft => {
      let comp = dft.steps[step - 1].completed;
      comp.push('yes');
    });
    let allDrifts = await db.drifts.toArray();
    setDrifts(allDrifts);
    // console.log('allDrifts from checkStep: ', allDrifts);
  }

  const addRecording = async (blob, id, step) => {
    db.drifts.where('id').equals(id).modify(dft => {
      dft.steps[step - 1].records.push(blob);
    });
    let allDrifts = await db.drifts.toArray();
    setDrifts(allDrifts);
    // console.log('allDrifts from addRecording: ', allDrifts);
  }

  const deleteRecording = async (index, id, step) => {
    db.drifts.filter(e => e.id === id).modify(dft => {
      let recs = dft.steps[step - 1].records;
      recs.splice(index, 1);
    });
    let allDrifts = await db.drifts.toArray();
    setDrifts(allDrifts);
    // console.log('allDrifts from deleteRecording: ', allDrifts);
  }

  const addDrift = (drift) => {
    db.drifts.add(drift).then(async () => {
      let allDrifts = await db.drifts.toArray();
      // console.log('allDrifts from addDrift: ', allDrifts);
      setDrifts(allDrifts);
    });
  }

  const deleteDrift = async (id) => {
    db.drifts.delete(id);
    let allDrifts = await db.drifts.toArray();
    // console.log('allDrifts from deleteDrift: ', allDrifts);
    setDrifts(allDrifts);
  }

  // const debounceHandleResize = debounce(handleResize, 500);
  // const debounce = (callback, wait) => {
  //   let timeout = null
  //   return (...args) => {
  //     const next = () => callback(...args)
  //     clearTimeout(timeout)
  //     timeout = setTimeout(next, wait)
  //   }
  // }

  const handleResize = () => {
    setWinSize({
      height: window.innerHeight,
      width: window.innerWidth
    });
  }

  useEffect(() => {
    const getDrifts = async () => {
      let allDrifts = await db.drifts.toArray();
      setDrifts(allDrifts);
      console.log('drifts from db fetched!');
    }
    getDrifts();
    window.addEventListener('resize', handleResize);
    console.log('App rendering...');
    return () => {
      window.removeEventListener('resize', handleResize);
      console.log('App unmounting...');
    }
  }, []);


  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div
        className="app-container"
        style={winSize.width < 620 ? {height: `${winSize.height}px`} : {height: `${winSize.height - 90}px`}}>
        {toggle && <Menu setToggle={toggler}/>}
        <Switch>
          <Route path="/" exact>
            <DriftList
              drifts={drifts}
              setToggle={toggler}
            />
          </Route>
          <Route path="/start" exact>
            <Start
              addDrift={addDrift}
              setToggle={toggler}
            />
          </Route>
          <Route path="/:driftId" exact>
            <Overview
              drifts={drifts}
              deleteDrift={deleteDrift}
              setToggle={toggler}
            />
          </Route>
          <Route path="/:driftId/:stepIndex" exact>
            <Step
              drifts={drifts}
              addRecording={addRecording}
              deleteRecording={deleteRecording}
              checkStep={checkStep}
              setToggle={toggler}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App