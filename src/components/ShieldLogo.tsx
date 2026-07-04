const ShieldLogo = ({ className = "w-10 h-10" }: { className?: string }) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 5 L90 20 L90 45 C90 70 75 88 50 95 C25 88 10 70 10 45 L10 20 L50 5Z"
        fill="#2f7a4f"
        stroke="#1e5a38"
        strokeWidth="3"
      />
      <path
        d="M50 12 L83 25 L83 45 C83 65 72 80 50 86 C28 80 17 65 17 45 L17 25 L50 12Z"
        fill="#fcfaf5"
        stroke="#1e5a38"
        strokeWidth="2"
      />
      <path
        d="M35 50 L45 60 L65 35"
        stroke="#2f7a4f"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="50"
        cy="70"
        r="3"
        fill="#2f7a4f"
        opacity="0.3"
      />
    </svg>
  )
}

export default ShieldLogo