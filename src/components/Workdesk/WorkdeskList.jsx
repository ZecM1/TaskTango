import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { userDataContext } from '../../containers/App';
import { findWorkdeskIndex } from '../Utility/FindCurrentLocation';
import './SidebarStyles.css';
import { saveToLocalStorage } from '../Utility/SaveToLocalStorage';
import { CheckIcon } from '../../assets/Check';
import { CancelIcon } from '../../assets/Cancel';

export const WorkdeskList = () => {
  // Has current location
  const location = useLocation();
  const navigate = useNavigate();

  const [newWorkdeskName, setNewWorkdeskName] = useState('');
  let { data } = useContext(userDataContext);

  let workdesks = data.workdesks.map((workdesk) => ({
    label: workdesk.name,
    path: workdesk.path,
  }));

  const handleClick = (path) => {
    const newIndex = findWorkdeskIndex(path, data);
    data.lastOpenedWorkdesk = newIndex;
    navigate(`/${path}`);
  };

  const handleAddWorkdeskClick = () => {
    const targetElement = document.getElementById('newWorkdeskModal');
    targetElement.classList.remove('modal-overlay-disabled');
    targetElement.classList.add('modal-overlay-active');
  };

  // Closes Modal
  const handleModalCancel = () => {
    const targetElement = document.getElementById('newWorkdeskModal');
    targetElement.classList.remove('modal-overlay-active');
    targetElement.classList.add('modal-overlay-disabled');
  };

  const getNewPath = () => {
    let newPath = '1';

    while (true) {
      let foundMatch = false;

      for (let item of data.workdesks) {
        if (newPath === item.path) {
          foundMatch = true;
          break;
        }
      }

      if (foundMatch) {
        const currentNumber = parseInt(newPath);
        newPath = (currentNumber + 1).toString();
      } else {
        return newPath;
      }
    }
  };

  // Creates new workdesk
  // REQUIRES APPLICATION RESTART!
  // needs to save new data on server and then restart application with new data object
  const handleModalAccept = (e) => {
    let targetItem = document.getElementById('newWorkdeskInput');
    let targetName;
    targetItem.value !== '' ? (targetName = targetItem.value) : (targetName = 'My Workdesk');
    let newPath = getNewPath();
    let newWorkdesk = { ...data.defaultWorkdesk };
    newWorkdesk.path = newPath;
    newWorkdesk.name = targetName;
    data.workdesks = [...data.workdesks, newWorkdesk];
    saveToLocalStorage(data);
    window.location.reload(); // Reloads window
    // SAVE DATA ON SERVER HERE
  };

  // Limits input to 15 characters
  const limitNameInput = (e) => {
    setNewWorkdeskName(e.target.value.slice(0, 15));
  };

  return (
    <div className='outer-container workdesk-group-container'>
      <div className='workdesk-group custom-scroll'>
        <ul>
          {/* Makes the list of workdesks and outlines the active one */}
          {workdesks.map((workdesk, index) => (
            <li
              key={index}
              onClick={() => handleClick(workdesk.path)}
              className={location.pathname === `/${workdesk.path}` ? 'active-workdesk ' : ''}
            >
              {workdesk.label}
            </li>
          ))}
          <li className='add-workdesk-button' onClick={() => handleAddWorkdeskClick()}>
            <p>+ Add Workdesk</p>
          </li>
        </ul>
      </div>
      <div className='modal-overlay' id='newWorkdeskModal'>
        <div className='new-workdesk-popup'>
          <p>Enter New Workdesk Name:</p>
          <div className='new-workdesk-popup-container'>
            <input
              id='newWorkdeskInput'
              value={newWorkdeskName}
              onChange={limitNameInput}
              type='text'
              placeholder='15 characters max.'
              className='new-workdesk-popup-name'
              maxLength={15}
            ></input>
            <div className='new-workdesk-icon-container'>
              <div onClick={(e) => handleModalAccept(e)}>
                <CheckIcon className='new-workdesk-popup-icons popup-icons-yes'></CheckIcon>
              </div>
              <div onClick={() => handleModalCancel()}>
                <CancelIcon className='new-workdesk-popup-icons popup-icons-no'></CancelIcon>
              </div>
            </div>
          </div>
          <p id='new-workdesk-popup-warning'>Confirming will save your progress and reload the page!</p>
        </div>
      </div>
    </div>
  );
};
