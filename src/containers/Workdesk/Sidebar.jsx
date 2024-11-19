import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../App';
import { EditStyles } from '../../components/Workdesk/EditStyles';
import { WorkdeskList } from '../../components/Workdesk/WorkdeskList';
import { saveToLocalStorage } from '../../components/Utility/SaveToLocalStorage';
import { findWorkdeskIndex } from '../../components/Utility/FindCurrentLocation';
import { SaveIcon } from '../../assets/Save';
import { TrashIcon } from '../../assets/Trash';
import './Sidebar.css';

export const Sidebar = ({ setBoardStyle, setColumnStyle, triggerBoardRerender }) => {
  const [sidebarClasses, setSidebarClasses] = useState('sidebar-container');
  const [buttonClasses, setButtonClasses] = useState('sidebar-button');
  const [buttonContent, setButtonContent] = useState('<');
  const [resetTrigger, setResetTrigger] = useState(false);
  let { data } = useContext(userDataContext);
  const navigate = useNavigate();

  const handleHideSidebar = () => {
    if (sidebarClasses.includes('hidden')) {
      setSidebarClasses(sidebarClasses + ' shown');
      setButtonClasses(buttonClasses + ' shown-button');
      setButtonContent('<');

      setTimeout(() => {
        setSidebarClasses('sidebar-container');
        setButtonClasses('sidebar-button');
      }, 500);
    } else {
      setSidebarClasses(sidebarClasses + ' hidden');
      setButtonClasses(buttonClasses + ' hidden-button');
      setButtonContent('>');
    }
  };
  const handleSave = () => {
    // SAVE EVERYTHING TO BACKEND!
    saveToLocalStorage(data);
  };

  const deleteActiveWorkdesk = () => {
    let availablePathArray = data.workdesks.map((workdesk) => workdesk.path);

    // Navigate to first existing workdesk upon deletion
    // Workdesk path and index are not the same
    if (data.workdesks.length > 1) {
      let targetIndex = findWorkdeskIndex(availablePathArray[0], data);
      data.workdesks.splice(data.lastOpenedWorkdesk, 1);
      const newPath = availablePathArray[targetIndex === data.lastOpenedWorkdesk ? 1 : 0];
      targetIndex = findWorkdeskIndex(newPath, data);
      data.lastOpenedWorkdesk = targetIndex;
      navigate(`/${data.workdesks[targetIndex].path}`);
      triggerBoardRerender();
    } else {
      alert('Cannot delete the only remaining workdesk!');
    }
  };

  const handleStyleReset = () => {
    setResetTrigger(!resetTrigger);
  };

  return (
    <>
      <div id='sidebar' className={sidebarClasses}>
        <div className='sidebar-tools'>
          <EditStyles setBoardStyle={setBoardStyle} setColumnStyle={setColumnStyle} resetTrigger={resetTrigger} />
          <div className='sidebar-reset-button' onClick={() => handleStyleReset()}>
            Reset Styles
          </div>
          <WorkdeskList />
          <div className='icon-container'>
            <div className='sidebar-trash-button' id='trashButton' onClick={deleteActiveWorkdesk}>
              <TrashIcon></TrashIcon>
            </div>
            <div className='sidebar-save-button' id='saveButton' onClick={handleSave}>
              <SaveIcon></SaveIcon>
            </div>
          </div>
        </div>
      </div>
      <div id='sidebarButton' className={buttonClasses} onClick={handleHideSidebar}>
        <p>{buttonContent}</p>
      </div>
    </>
  );
};
