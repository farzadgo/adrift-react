import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import SubHeader from './SubHeader';
import Sorry from './Sorry';
import './DriftView.css';
import * as Icon from 'react-feather';


const DriftView = ({ drifts, setToggle, passData }) => {

  let drift;
  const info = { title: 'DriftView' };
  const { id } = useParams();
  // OR USE "useLocation()"

  // BE AWARE ID CREATED IN DRIFT CONSTRUTOR (drift.id)
  // MIGHT BE A "number" SO "===" TURNS FALSE AS REACT
  // CONVERTS "{ id }" TO STRING

  // IMPORTANT
  if (drifts.length !== 0) {
    drift = drifts.filter(item => item.id === id)[0];
  }


  const StepsList = ({ drift }) => {
    // const [done, setDone] = useState(drift.completed);
    const length = drift.completed.length;

    return (
      <div className="preview">
        <p>Forget about {drift.destination}.. {drift.completed.filter(e => e !== false).length}/{length}</p>

        <ul className="preview-item list">
          {drift.orgSteps.map((e, i) => <li className="preview-list-item"> {drift.orgSteps[i]} </li>)}
        </ul>

        <ul className="preview-item list">
          {drift.newSteps.map((e, i) => <li className="preview-list-item"> {drift.newSteps[i]} </li>)}
        </ul>

      </div>
    )
  }

  const ProceedBtn = () => {
    const iconProps = {
      color: 'white',
      size: 40,
      strokeWidth: 1
    }
    const handleClick = () => {
      console.log('proceed clicked');
    }
    return (
      <button type="button" onClick={handleClick} className="">
        <Icon.Play {...iconProps}/>
      </button>
    );
  }

  const DeleteBtn = ({ id }) => {
    const iconProps = {
      color: 'white',
      size: 40,
      strokeWidth: 1
    }
    const history = useHistory();
    const handleClick = () => {
      passData(id);
      history.push("/");
    }
    return (
      <button type="button" onClick={handleClick} className="">
        <Icon.Trash {...iconProps}/>
      </button>
    );
  }


  return (
    <div className="view-page">
      <SubHeader title={info.title} setToggle={setToggle}/>
      {drift ? <StepsList drift={drift}/> : <Sorry />}
      {drift ? <DeleteBtn id={drift.id}/> : null }
      {drift ? <ProceedBtn /> : null }
    </div>
  )
}

export default DriftView
