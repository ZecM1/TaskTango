const executeColumnMove = (columnToMove, side, data, workdeskIndex, triggerRerender) => {
  let newColumnIndex = undefined;
  side === 'right' ? (newColumnIndex = Number(columnToMove) + 1) : (newColumnIndex = Number(columnToMove) - 1);

  [data.workdesks[workdeskIndex].columns[Number(columnToMove)], data.workdesks[workdeskIndex].columns[newColumnIndex]] =
    [
      data.workdesks[workdeskIndex].columns[newColumnIndex],
      data.workdesks[workdeskIndex].columns[Number(columnToMove)],
    ];
  triggerRerender();
};

export const handleColumnMove = (event, side, data, workdeskIndex, triggerRerender) => {
  // Checks if column is first or last, if it is neither, calls does the move function
  const columnIndex = event.currentTarget.dataset.column;
  if (side === 'right') {
    const nextColumnIndex = data.workdesks[workdeskIndex].columns[Number(columnIndex) + 1];
    if (nextColumnIndex === undefined) {
      return undefined;
    } else {
      executeColumnMove(columnIndex, side, data, workdeskIndex, triggerRerender);
    }
  } else if (side === 'left') {
    executeColumnMove(columnIndex, side, data, workdeskIndex, triggerRerender);
  }
};

export const handleColumnDelete = (event, data, workdeskIndex, triggerRerender) => {
  let columnIndex = event.currentTarget.dataset.column;
  data.workdesks[workdeskIndex].columns.splice(Number(columnIndex), 1);
  triggerRerender();
};

export const handleColumnAdd = (data, workdeskIndex, triggerRerender) => {
  data.workdesks[workdeskIndex].columns.push(['Title', '']);
  triggerRerender();
};
