export function CubeSVG({ size = 110 }: { size?: number }) {
  return (
    <svg
      className="cube-placeholder"
      width={size}
      height={size}
      viewBox="0 0 110 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="18" y="50" width="74" height="48" rx="9" fill="#CCB6EA" opacity="0.88"/>
      <polygon points="18,50 55,28 92,50" fill="#9880BB" opacity="0.92"/>
      <polygon points="92,50 92,98 55,120 55,72" fill="#7B5FA0" opacity="0.78"/>
      <ellipse cx="40" cy="40" rx="9" ry="5" fill="white" opacity="0.22" transform="rotate(-25 40 40)"/>
    </svg>
  )
}

export function CubeSVGSmall() {
  return (
    <svg width="60" height="60" viewBox="0 0 110 110" fill="none">
      <rect x="18" y="50" width="74" height="48" rx="9" fill="#CCB6EA" opacity="0.88"/>
      <polygon points="18,50 55,28 92,50" fill="#9880BB" opacity="0.92"/>
      <polygon points="92,50 92,98 55,120 55,72" fill="#7B5FA0" opacity="0.78"/>
    </svg>
  )
}
