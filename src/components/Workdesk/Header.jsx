import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { userDataContext } from '../../containers/App.jsx';
import { findWorkdeskName, findWorkdeskIndex } from '../Utility/FindCurrentLocation';
// import { triggerListRerender } from '../Workdesk/WorkdeskList.jsx';
import { EditIcon } from '../../assets/Edit.jsx';
import './Header.css';

export const WorkdeskHeader = ({ setIsAuthenticated, triggerListRerender }) => {
  let { data } = useContext(userDataContext);
  const location = useLocation();

  const [rerenderDummy, setRerenderDummy] = useState(false);

  let workdeskName = findWorkdeskName(location, data);

  const signOut = () => {
    // SEND A SAVE OF THE OBJECT TO SERVER!!
    // setUserData(novi data objekt) ? ili samo pozovi funkciju koja sejva
    setIsAuthenticated(false);
  };

  useEffect(() => {}, [rerenderDummy]);

  function triggerRerender() {
    setRerenderDummy(!rerenderDummy);
  }

  const nameChange = () => {
    const nameElement = document.getElementById('workdeskName');
    nameElement.classList.add('workdeskNameEditing');
    nameElement.contentEditable = true;
    nameElement.focus();
    document.execCommand('selectAll', false, null);
  };
  const finalizeNameChange = (event) => {
    const targetElement = event.target;
    let targetPath = location.pathname.slice(1);
    let workdeskIndex = findWorkdeskIndex(targetPath, data);
    data.workdesks[workdeskIndex].name = targetElement.textContent;
    targetElement.classList.remove('workdeskNameEditing');
    targetElement.contentEditable = false;
    triggerRerender();
    triggerListRerender();
  };

  return (
    <div className='workdeskHeader'>
      <div className='title'>
        <h1>Task Tango</h1>
      </div>
      <div className='workdeskNameContainer'>
        {
          <h2 id='workdeskName' className='workdeskName' onBlur={(e) => finalizeNameChange(e)}>
            {workdeskName}
          </h2>
        }
        <div
          className='editWordkeskIcon'
          onClick={() => {
            nameChange();
          }}
        >
          <EditIcon></EditIcon>
        </div>
      </div>
      <Link to='/' onClick={() => signOut()} className='sign-out'>
        Sign Out
      </Link>
    </div>
  );
};
