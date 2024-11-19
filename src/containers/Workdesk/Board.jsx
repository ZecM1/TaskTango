import React, { useState, useContext, useEffect, useRef } from 'react';
import { userDataContext } from '../App';
import {
  applyEdit,
  handleDragStart,
  handleDragOver,
  handleDragLeave,
  handleDrop,
} from '../../components/Utility/DragDropFunctions';
import { handleColumnMove, handleColumnDelete, handleColumnAdd } from '../../components/Utility/ColumnManipulation';

import './Board.css';
import CancelButton from '../../components/Homepage/CancelButton';

export const Board = ({ boardStyle, columnStyle, rerenderDummy, triggerRerender }) => {
  const [boardItems, setBoardItems] = useState(undefined);

  // Array with coordinates of item to delete/moved item
  const dataToDeleteRef = useRef([]);

  let { data, updateUserData } = useContext(userDataContext);
  let workdeskIndex = data.lastOpenedWorkdesk;

  let appendBefore = undefined;

  let arrowLeft = '<';
  let arrowRight = '>';

  // Re-render whenever user changes workdesks, edits a style or edits text
  // Also re-render during a dragging event or after droping to enable/disable edits
  useEffect(() => {
    renderUserData();
  }, [workdeskIndex, columnStyle, rerenderDummy]);

  const handleAddCardClick = (event) => {
    const targetColumn = event.target.dataset.column;
    data.workdesks[workdeskIndex].columns[targetColumn].push(' ');
    triggerRerender();
  };

  const handleDeleteCardClick = (event) => {
    const targetColumn = event.target.dataset.column;
    const targetRow = event.target.dataset.row;
    data.workdesks[workdeskIndex].columns[targetColumn].splice([targetRow], 1);
    triggerRerender();
  };

  const handleFocus = (event, isFocused) => {
    let target = event.target.id;
    target += '-delete';
    const element = document.getElementById(target);
    isFocused ? element.classList.add('fake-focus') : element.classList.remove('fake-focus');
  };

  const renderUserData = () => {
    workdeskIndex = data.lastOpenedWorkdesk;
    const workdeskColumns = data.workdesks[workdeskIndex].columns;

    const dataToRender = (
      <>
        {workdeskColumns.map((columnKey, columnIndex) => (
          <div
            className='board-column-container'
            style={columnStyle}
            key={`column-${columnIndex}`}
            // As the parent it must have draggable true
            draggable='true'
            onDragStart={(event) => {
              event.stopPropagation();
              event.preventDefault();
            }}
          >
            <div
              className='board-column-block'
              data-column={columnIndex}
              onDragOver={(e) => {
                appendBefore = handleDragOver(e);
              }}
              onDragLeave={handleDragLeave}
              onDrop={(e) =>
                handleDrop(e, updateUserData, data, workdeskIndex, dataToDeleteRef, appendBefore, triggerRerender)
              }
            >
              <div
                className='board-column-block-delete'
                data-column={columnIndex}
                onClick={(e) => handleColumnDelete(e, data, workdeskIndex, triggerRerender)}
              >
                <CancelButton className='board-column-block-delete'></CancelButton>
              </div>
              <div className='board-column-block-elements'>
                <p
                  data-column={columnIndex}
                  data-row={0}
                  className='board-column-title'
                  contentEditable={true}
                  suppressContentEditableWarning
                  draggable='false'
                  onClick={() => {
                    document.execCommand('selectAll', false, null);
                  }}
                  onBlur={(e) => {
                    applyEdit(e, workdeskIndex, triggerRerender, data);
                    window.getSelection().removeAllRanges();
                  }}
                >
                  {columnKey[0]}
                </p>

                {workdeskColumns[columnIndex].slice(1).map((item, itemIndex) => (
                  <div
                    className='board-column-text-container custom-scroll'
                    key={`${columnIndex}-${itemIndex}-container`}
                  >
                    <p
                      id={`${columnIndex}-${itemIndex}`}
                      data-column={columnIndex}
                      data-row={itemIndex + 1}
                      className='board-column-text'
                      key={`${columnIndex}-${itemIndex}`}
                      contentEditable={true}
                      suppressContentEditableWarning
                      onFocus={(e) => handleFocus(e, true)}
                      onBlur={(e) => {
                        applyEdit(e, workdeskIndex, triggerRerender, data);
                        handleFocus(e, false);
                        window.getSelection().removeAllRanges();
                      }}
                      draggable='true'
                      onDragStart={(event) => {
                        event.stopPropagation();
                        handleDragStart(event, dataToDeleteRef, triggerRerender);
                      }}
                      onClick={() => {
                        document.execCommand('selectAll', false, null);
                      }}
                    >
                      {item}
                    </p>
                    <div
                      id={`${columnIndex}-${itemIndex}-delete`}
                      key={`${columnIndex}-${itemIndex}-delete`}
                      data-column={columnIndex}
                      data-row={itemIndex + 1}
                      className='board-column-delete'
                      onClick={(e) => handleDeleteCardClick(e)}
                    ></div>
                  </div>
                ))}
                <div className='board-column-bottom-container'>
                  <p className='board-column-add-text' data-column={columnIndex} onClick={(e) => handleAddCardClick(e)}>
                    + Add Card
                  </p>
                  <div className='board-column-move'>
                    <p
                      data-column={columnIndex}
                      className={columnIndex == 0 ? 'disabled board-column-move-button' : 'board-column-move-button'}
                      onClick={
                        columnIndex == 0
                          ? undefined
                          : (e) => handleColumnMove(e, 'left', data, workdeskIndex, triggerRerender)
                      }
                    >
                      {arrowLeft}
                    </p>
                    <p
                      data-column={columnIndex}
                      className='board-column-move-button'
                      onClick={(e) => handleColumnMove(e, 'right', data, workdeskIndex, triggerRerender)}
                    >
                      {arrowRight}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className='board-add-new-column' onClick={() => handleColumnAdd(data, workdeskIndex, triggerRerender)}>
          +
        </div>
      </>
    );
    setBoardItems(dataToRender);
  };

  return (
    <div className='board-column' style={boardStyle}>
      {boardItems}
    </div>
  );
};
