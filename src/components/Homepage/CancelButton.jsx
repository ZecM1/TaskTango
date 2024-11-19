import React from 'react';

const CancelButton = ({ className, size = '48', strokeColor = '#efefdc', fillColor = '#521935' }) => {
  return (
    <>
      <svg
        className={`cancelButton ${className}`}
        xmlns='http://www.w3.org/2000/svg'
        width={size || '48'}
        height={size || '48'}
        viewBox='0 0 24 24'
      >
        <path
          stroke={strokeColor || '#efefdc'}
          fill={fillColor || '#521935'}
          strokeWidth='1'
          d='m16.24 12 3.18-3.18a1.5 1.5 0 0 0 0-2.12L17.3 4.58a1.5 1.5 0 0 0-2.12 0L12 7.76 8.82 4.58a1.5 1.5 0 0 0-2.12 0L4.58 6.7a1.5 1.5 0 0 0 0 2.12L7.76 12l-3.18 3.18a1.5 1.5 0 0 0 0 2.12l2.12 2.12a1.5 1.5 0 0 0 2.12 0L12 16.24l3.18 3.18a1.5 1.5 0 0 0 2.12 0l2.12-2.12a1.5 1.5 0 0 0 0-2.12L16.24 12Z'
        ></path>
      </svg>
    </>
  );
};

export default CancelButton;
