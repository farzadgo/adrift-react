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
  const toggler = () => setToggle(prev => !prev);
  // const [height, setHeight] = useState(window.innerHeight);
  const [winSize, setWinSize] = useState({
    height: window.innerHeight, width: window.innerWidth
  });

  const checkStep = (id, step) => {
    db.drifts.filter(e => e.id === id).modify(async (e) => {
      let comp = e.steps[step - 1].completed;
      await comp.push('yes');
      let allDrifts = await db.drifts.toArray();
      setDrifts(allDrifts);
    });
  }

  const addRecording = (blob, id, step) => {
    // console.log(db.drifts.where('id').equals(id));
    // console.log(db.drifts.filter(e => e.id === id));
    db.drifts.filter(e => e.id === id).modify(async dft => {
      await dft.steps[step - 1].records.push(blob);
      let allDrifts = await db.drifts.toArray();
      console.log(allDrifts);
      setDrifts(allDrifts);
    });
    // drifts.filter(e => e.id === id)[0].steps[step - 1].records.push(blob);
    // setDrifts(drifts);
  }

  const deleteRecording = (index, id, step) => {
    db.drifts.filter(e => e.id === id).modify(async (e) => {
      let recs = e.steps[step - 1].records;
      await recs.splice(index, 1);
      let allDrifts = await db.drifts.toArray();
      setDrifts(allDrifts);
    });
  }

  const addDrift = (drift) => {
    db.drifts.add(drift).then(async () => {
      let allDrifts = await db.drifts.toArray();
      setDrifts(allDrifts);
    });
  }

  const deleteDrift = async (id) => {
    db.drifts.delete(id);
    let allDrifts = await db.drifts.toArray();
    setDrifts(allDrifts);
  }

  // const handlePageRefresh = (e) => {
  //   console.log(e);
  //   e.preventDefault();
  //   e.returnValue = '';
  // }

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
    // window.addEventListener('beforeunload', handlePageRefresh);
    window.addEventListener('resize', handleResize);
    // handleResize();
    console.log('render app');
    return () => {
      // window.removeEventListener('beforeunload', handlePageRefresh);
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  console.log(winSize);

  return (
    <Router>
      <div className="app-container" style={winSize.width < 620 ? {height: `${winSize.height}px`} : {height: `${winSize.height - 90}px`}}>
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