import React, { useState, useEffect, useRef, useContext } from 'react';
import { userDataContext } from '../../containers/App';
import './SidebarStyles.css';

export const EditStyles = ({ setBoardStyle, setColumnStyle, resetTrigger }) => {
  let { data } = useContext(userDataContext);

  const fontOptions = [
    { value: 'var(--font-six)', label: 'Verdana' },
    { value: 'var(--font-one)', label: 'Mate' },
    { value: 'var(--font-two)', label: 'Courier New' },
    { value: 'var(--font-three)', label: 'Dancing Script' },
    { value: 'var(--font-four)', label: 'Lugrasimo' },
    { value: 'var(--font-five)', label: 'Shantell Sans' },
    { value: 'var(--font-seven)', label: 'Playfair Display' },
  ];

  // Default values load from the data object
  let workdeskFontSize = data.style.fontSize;
  workdeskFontSize = workdeskFontSize.replace(/[^0-9.-]+/g, '');
  workdeskFontSize = Number.parseFloat(workdeskFontSize).toFixed(1);

  let workdeskColumnWidth = data.style.width.replace(/[^0-9.-]+/g, '');
  workdeskColumnWidth = parseInt(workdeskColumnWidth, 10);
  let workdeskFontFamily = data.style.fontFamily;

  const [fontFamily, setFontFamily] = useState(workdeskFontFamily);
  const [fontSize, setFontSize] = useState(workdeskFontSize);
  const [columnWidth, setColumnWidth] = useState(workdeskColumnWidth);
  const isFirstRender = useRef(0);

  useEffect(() => {
    setBoardStyle((prevStyles) => ({
      ...prevStyles,
      fontSize: `${fontSize}rem`,
      fontFamily: fontFamily,
    }));
    data.style.fontSize = `${fontSize}rem`;
    data.style.fontFamily = fontFamily;
  }, [fontSize, fontFamily]);

  useEffect(() => {
    setColumnStyle((prevStyle) => ({
      ...prevStyle,
      width: `${columnWidth}rem`,
    }));
    data.style.width = `${columnWidth}rem`;
  }, [columnWidth]);

  // Once the RESET button is pressed in the Sidebar (parent) component, this useEffect triggers and resets styles to default
  useEffect(() => {
    if (isFirstRender.current !== 2) {
      isFirstRender.current += 1;
      return;
    } else {
      setFontSize(parseFloat(data.defaultStyle.fontSize.slice(0, -3)).toFixed(1));
      setColumnWidth(16);
    }
  }, [resetTrigger]);

  const handleFontChange = (event) => {
    const newSelectedOption = event.target.value;
    setFontFamily(newSelectedOption);
  };

  // Increase or decrease font size, also rounds the result due to binary errors with float
  const handleFontSize = (value) => {
    setFontSize((currentFontSize) => {
      currentFontSize = +currentFontSize;
      if (value === 'plus' && currentFontSize < 3.6) {
        let newFontSize = parseFloat(currentFontSize + 0.2).toFixed(1);
        return newFontSize;
      } else if (value === 'minus' && currentFontSize > 0.6) {
        let newFontSize = parseFloat(currentFontSize - 0.2).toFixed(1);
        return newFontSize;
      } else {
        return currentFontSize;
      }
    });
  };

  const handleColumnSize = (value) => {
    if (value === 'plus' && columnWidth < 30) {
      setColumnWidth(columnWidth + 1);
    } else if (value === 'minus' && columnWidth > 9) {
      setColumnWidth(columnWidth - 1);
    } else setColumnWidth(columnWidth);
  };

  return (
    <div className='outer-container'>
      <div className='text-container'>
        <div className='inner-container'>
          <p>Font:</p>
          <div className='control-group'>
            <select className='dropdown-select' value={fontFamily} onChange={handleFontChange}>
              {fontOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='inner-container'>
          <p>Font Size:</p>
          <div className='control-group'>
            <div className='control-button' onClick={() => handleFontSize('plus')}>
              <p className='control-button-p'>+</p>
            </div>
            <div className='control-button' onClick={() => handleFontSize('minus')}>
              <p className='control-button-p'>-</p>
            </div>
          </div>
        </div>
      </div>
      <div className='column-container'>
        <div className='inner-container'>
          <p>Column Size:</p>
          <div className='control-group'>
            <div className='control-button' onClick={() => handleColumnSize('plus')}>
              <p className='control-button-p'>+</p>
            </div>
            <div className='control-button' onClick={() => handleColumnSize('minus')}>
              <p className='control-button-p'>-</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
