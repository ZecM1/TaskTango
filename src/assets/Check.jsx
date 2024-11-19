export function CheckIcon({ className, size = '30' }) {
  return (
    <svg
      className={className}
      width={size || '30'}
      height={size || '30'}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fill='none'
        stroke='#873643'
        strokeWidth='8'
        d='M4 12.6111L8.92308 17.5L20 6.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path fill='0' strokeWidth='4' d='M4 12.6111L8.92308 17.5L20 6.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
}
