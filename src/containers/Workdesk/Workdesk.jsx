import React, { useState, useEffect } from 'react';
import { WorkdeskHeader } from '../../components/Workdesk/Header';
import { Sidebar } from './Sidebar';
import { Board } from './Board';
import './Workdesk.css';

export const Workdesk = ({ setIsAuthenticated }) => {
  const [boardStyle, setBoardStyle] = useState({});
  const [columnStyle, setColumnStyle] = useState({ width: '16rem' });
  const [rerenderWorkdeskList, setRerenderWorkdeskList] = useState(false);
  const [rerenderBoard, setRerenderBoard] = useState(false);

  function triggerBoardRerender() {
    setRerenderBoard(!rerenderBoard);
  }

  function triggerListRerender() {
    setRerenderWorkdeskList(!rerenderWorkdeskList);
  }
  useEffect(() => {}, [rerenderWorkdeskList]);

  return (
    <div className='workdesk-container'>
      <WorkdeskHeader
        setIsAuthenticated={setIsAuthenticated}
        triggerListRerender={triggerListRerender}
      ></WorkdeskHeader>
      <div className='body-container'>
        <Sidebar
          setBoardStyle={setBoardStyle}
          setColumnStyle={setColumnStyle}
          triggerListRerender={triggerListRerender}
          triggerBoardRerender={triggerBoardRerender}
        ></Sidebar>
        <div className='workboard'>
          <Board
            boardStyle={boardStyle}
            columnStyle={columnStyle}
            rerenderDummy={rerenderBoard}
            triggerRerender={triggerBoardRerender}
          ></Board>
        </div>
      </div>
    </div>
  );
};
