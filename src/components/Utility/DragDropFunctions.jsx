// Saves edits that happen on click, to the Data object
export const applyEdit = (event, workdeskIndex, triggerRerender, data) => {
  let newText = event.target.innerText;
  const targetColumn = event.target.dataset.column;
  const targetRow = event.target.dataset.row;

  data.workdesks[workdeskIndex].columns[targetColumn][targetRow] = newText;

  triggerRerender();
};

export const handleDragStart = (event, dataToDeleteRef, triggerRerender) => {
  let draggedElementColumn = event.target.getAttribute('data-column');
  let draggedElementRow = event.target.getAttribute('data-row');
  dataToDeleteRef.current = [+draggedElementColumn, +draggedElementRow];

  event.dataTransfer.setData('text/plain', event.target.textContent);

  triggerRerender();
};

// Creates a highlight onDragOver and returns true if top half is hovered
export const handleDragOver = (event) => {
  event.preventDefault();
  const dropTargets = event.target.closest('.board-column-text');
  if (dropTargets === null) {
    return;
  }
  const dropTargets2 = dropTargets.nextElementSibling;

  const rect = dropTargets.getBoundingClientRect();
  const mouseY = event.clientY - rect.top;
  const height = rect.height;
  const isTopHalf = mouseY <= height / 2;

  dropTargets.style.backgroundImage = ''; // Reset the hover highlight
  dropTargets2.style.backgroundImage = '';

  if (isTopHalf) {
    dropTargets.style.backgroundImage = `linear-gradient(to top, transparent 60%, rgba(255, 255, 255, 0.35))`;
    dropTargets2.style.backgroundImage = `linear-gradient(to top, transparent 60%, rgba(255, 255, 255, 0.35))`;
    return true;
  } else {
    dropTargets.style.backgroundImage = `linear-gradient(to bottom, transparent 60%, rgba(255, 255, 255, 0.35))`;
    dropTargets2.style.backgroundImage = `linear-gradient(to bottom, transparent 60%, rgba(255, 255, 255, 0.35))`;
    return false;
  }
};

// Removes the highlight onDragLeave
// Element function but also called by handleDrop function
export const handleDragLeave = (event) => {
  const dropTargets = event.target.closest('p');
  // Prevents errors
  if (dropTargets === null || dropTargets.nextElementSibling === null) {
    return;
  }
  const dropTargets2 = dropTargets.nextElementSibling;
  dropTargets.style.backgroundImage = ''; // Remove highlight color
  dropTargets2.style.backgroundImage = '';
};

// Delete item that was dragged successfully
function deleteMovedItem(updateUserData, data, workdeskIndex, dataToDeleteRef) {
  updateUserData(
    data.workdesks[workdeskIndex].columns[dataToDeleteRef.current[0]].splice(dataToDeleteRef.current[1], 1),
  );
}

export const handleDrop = (
  event,
  updateUserData,
  data,
  workdeskIndex,
  dataToDeleteRef,
  appendBefore,
  triggerRerender,
) => {
  event.preventDefault();
  // Drag Leave doesn't happen if a drop happens, so we have to call it here as well to remove highlight from hover
  handleDragLeave(event);

  // These 3 cover all possible drop zones
  const dropTargets = event.target.closest('.board-column-text');
  const nearDropTargets = event.target.closest('p');
  const dropMiss = event.target.closest('.board-column-block');
  let droppedData = event.dataTransfer.getData('text/plain');

  // Delete moved item / target is set on drag start
  deleteMovedItem(updateUserData, data, workdeskIndex, dataToDeleteRef);
  let column;
  let row;

  // If you drop it on a 'p' element
  if (dropTargets !== null) {
    column = +dropTargets.dataset.column;
    row = +dropTargets.dataset.row;

    let isMovingDown = undefined;
    let isSameRow = undefined;

    row > dataToDeleteRef.current[1] ? (isMovingDown = true) : (isMovingDown = false);
    row == dataToDeleteRef.current[1] ? (isSameRow = true) : (isSameRow = false);
    isMovingDown ? (appendBefore ? (row -= 1) : undefined) : appendBefore ? undefined : (row += 1);

    isSameRow
      ? appendBefore
        ? (row = dataToDeleteRef.current[1] - 1)
        : (row = dataToDeleteRef.current[1] + 1)
      : undefined;
    row == 0 ? (row = 1) : undefined;

    updateUserData(data.workdesks[workdeskIndex].columns[column].splice(row, 0, droppedData));
    // If you drop it on other 'p' elements
  } else if (nearDropTargets !== null) {
    column = nearDropTargets.dataset.column;
    // If you drop it on the title
    if (nearDropTargets.classList.contains('board-column-title')) {
      updateUserData(data.workdesks[workdeskIndex].columns[column].splice(1, 0, droppedData));
      // If you drop it on the "add text" button
    } else if (
      nearDropTargets.classList.contains('board-column-add-text') ||
      nearDropTargets.classList.contains('board-column-move-button')
    ) {
      updateUserData(data.workdesks[workdeskIndex].columns[column].push(droppedData));
    }
    // If you drop it on the container itself missing the elements
  } else if (dropMiss !== null) {
    column = dropMiss.dataset.column;
    updateUserData(data.workdesks[workdeskIndex].columns[column].push(droppedData));
  }
  triggerRerender();
};
