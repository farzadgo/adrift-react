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

  const checkStep = (id, step) => {
    db.drifts.filter(e => e.id === id).modify(async (e) => {
      let comp = e.steps[step - 1].completed;
      await comp.push('yes');
      let allDrifts = await db.drifts.toArray();
      setDrifts(allDrifts);
    });
  }

  const addRecording = (blob, id, step) => {
    db.drifts.filter(e => e.id === id).modify(async (e) => {
      let recs = e.steps[step - 1].records;
      await recs.push(blob);
      let allDrifts = await db.drifts.toArray();
      setDrifts(allDrifts);
    });
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

  useEffect(() => {
    const getDrifts = async () => {
      let allDrifts = await db.drifts.toArray();
      setDrifts(allDrifts);
      console.log('data fetched');
    }
    getDrifts();
    // add window resize listener here
  }, []);


  return (
    <Router>
      <div className="app-container">
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