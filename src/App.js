import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Dexie from 'dexie';
import DriftList from "./components/DriftList";
import Start from "./components/Start";
import DriftView from "./components/DriftView";
import Menu from "./components/Menu";
import './App.css';


const App = () => {

  const db = new Dexie('adriftDB');
  db.version(1).stores({
    drifts: "id, date, dest, srcSteps, lstSteps, questions, records"
  })
  db.open().catch((err) => {
      console.log(err.stack || err)
  })

  const [toggle, setToggle] = useState(false);
  const [drifts, setDrifts] = useState([]);
  
  const toggler = () => setToggle(prev => !prev);

  const addDrift = (theNewDrift) => {
    console.log(theNewDrift);
    db.drifts.add(theNewDrift).then(async () => {
      let allDrifts = await db.drifts.toArray();
      setDrifts(allDrifts);
      console.log('new drift added');
    });
  }

  const deleteDrift = async (id) => {
    console.log(id);
    db.drifts.delete(id);
    let allDrifts = await db.drifts.toArray();
    setDrifts(allDrifts);
    console.log('the drift deleted');
  }

  const getDrifts = async () => {
    let allDrifts = await db.drifts.toArray();
    setDrifts(allDrifts);
    console.log('data fetched');
  }

  // Init the App
  useEffect(() => {
    getDrifts();
  }, []);

  // HOW TO USE A LOADING COMP (SPINNER...)
  // const [isLoading, setIsLoading] = useState(true);
  // {isLoading ? 'loading...' : <DriftList drifts={drifts} setToggle={toggler}/>}

  return (
    <Router>
      <div className="App">
        <Menu display={toggle} setToggle={toggler}/>
        <Switch>

          <Route path="/" exact>
            <DriftList drifts={drifts} setToggle={toggler}/>
          </Route>

          <Route path="/start" exact>
            <Start passData={addDrift} setToggle={toggler}/>
          </Route>

          <Route path="/:id" exact>
            <DriftView drifts={drifts} passData={deleteDrift} setToggle={toggler}/>
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App
