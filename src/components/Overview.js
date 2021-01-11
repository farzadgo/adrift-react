import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import SubHeader from './SubHeader';
import Sorry from './Sorry';
import './Overview.css';
import * as Icon from 'react-feather';


const Overview = ({ drifts, setToggle, deleteDrift }) => {

  let drift;
  const info = { title: 'Overview' };
  const { id } = useParams();
  // OR USE "useLocation()"

  // BE AWARE ID CREATED IN DRIFT CONSTRUTOR (drift.id)
  // MIGHT BE A "number" SO "===" TURNS FALSE AS REACT
  // CONVERTS "{ id }" TO STRING

  // IMPORTANT
  if (drifts.length !== 0) {
    drift = drifts.filter(item => item.id === id)[0];
  }

  // const headerParams = {
  //   title: 'Overview',
  //   stepId: id
  // }

  const StepsList = ({ drift }) => {
    // const [done, setDone] = useState(drift.completed);
    const length = drift.completed.length;
    const iconProps = {color: '#2a2726', size: 24, strokeWidth: 2}

    return (
      <>
        <p className="steps-title">Forget about {drift.destination}.. {drift.completed.filter(e => e !== false).length}/{length}</p>
        <div className="steps">
          <ul className="steps-list org">
            {drift.orgSteps.map((e, i) => <li key={i} className="steps-list-item"> {drift.orgSteps[i]} </li>)}
          </ul>
          <ul className="steps-list new">
            {drift.newSteps.map((e, i) => <li key={i} className="steps-list-item"> {drift.newSteps[i]} </li>)}
          </ul>
          <ul className="steps-list box">
            {drift.completed.map((e, i) => <li key={i} className="steps-list-item">
              {e ? <Icon.CheckCircle {...iconProps} /> : <Icon.Circle {...iconProps} />}
            </li>)}
          </ul>
        </div>
        <DeleteBtn id={drift.id} />
        {/* TODO: show if there is still 'false' in completed array left */}
        <ProceedBtn drift={drift} />
      </>
    )
  }


  const ProceedBtn = ({ drift }) => {
    const iconProps = {color: 'white', size: 40, strokeWidth: 1}
    const history = useHistory();

    const handleClick = () => {
      // console.log(drift);
      const currentStep = drift.completed.findIndex(e => e == false);
      history.push(`/${drift.id}/${currentStep}`);
    }

    return (
      <button type="button" onClick={handleClick} className="btn-big proceed-btn">
        <Icon.Play {...iconProps}/>
      </button>
    );
  }


  const DeleteBtn = ({ id }) => {
    const iconProps = {color: 'white', size: 40, strokeWidth: 1}
    const history = useHistory();

    const handleClick = () => {
      deleteDrift(id);
      history.push("/");
    }

    return (
      <button type="button" onClick={handleClick} className="btn-big delete-btn">
        <Icon.Trash {...iconProps}/>
      </button>
    );
  }


  return (
    <div className="drift-overview">
      <SubHeader title={info.title} setToggle={setToggle}/>
      {drift ? <StepsList drift={drift}/> : <Sorry />}
    </div>
  )
}

export default Overview
