export function CancelIcon({ className, size = '30' }) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width={size || '30'}
      height={size || '30'}
      viewBox='0 0 24 24'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line strokeWidth='8' stroke='#873643' fill='none' x1='18' y1='6' x2='6' y2='18'></line>
      <line strokeWidth='8' stroke='#873643' fill='none' x1='6' y1='6' x2='18' y2='18'></line>

      <line strokeWidth='4' fill='none' x1='18' y1='6' x2='6' y2='18'></line>
      <line strokeWidth='4' fill='none' x1='6' y1='6' x2='18' y2='18'></line>
    </svg>
  );
}
