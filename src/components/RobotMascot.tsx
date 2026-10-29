import React from 'react';

export const RobotMascot: React.FC<{ className?: string }> = ({ className = 'w-32 h-32' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        {/* Antenna */}
        <line x1="100" y1="40" x2="100" y2="20" stroke="#7548E8" strokeWidth="6" strokeLinecap="round" />
        <circle cx="100" cy="16" r="9" fill="#F59A38" className="animate-pulse" />
        
        {/* Head */}
        <rect x="50" y="40" width="100" height="75" rx="22" fill="#FFFFFF" stroke="#3478F6" strokeWidth="5" />
        
        {/* Screen / Face */}
        <rect x="62" y="52" width="76" height="50" rx="14" fill="#20283D" />
        
        {/* Friendly Eyes */}
        <circle cx="82" cy="74" r="8" fill="#16B886" />
        <circle cx="118" cy="74" r="8" fill="#16B886" />
        {/* Eye sparkles */}
        <circle cx="85" cy="71" r="2.5" fill="#FFFFFF" />
        <circle cx="121" cy="71" r="2.5" fill="#FFFFFF" />
        
        {/* Cute Smile */}
        <path
          d="M90 88C95 93 105 93 110 88"
          stroke="#16B886"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Ears / Headset */}
        <rect x="38" y="60" width="12" height="24" rx="6" fill="#3478F6" />
        <rect x="150" y="60" width="12" height="24" rx="6" fill="#3478F6" />

        {/* Neck */}
        <rect x="88" y="115" width="24" height="12" rx="4" fill="#CBD5E1" />

        {/* Body */}
        <rect x="55" y="127" width="90" height="60" rx="18" fill="#FFFFFF" stroke="#7548E8" strokeWidth="5" />
        
        {/* Chest Screen with Checkmark badge */}
        <rect x="74" y="140" width="52" height="34" rx="8" fill="#F2F4FF" stroke="#3478F6" strokeWidth="2" />
        <path
          d="M88 157L96 164L112 148"
          stroke="#16B886"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Arms */}
        <path
          d="M48 138C34 148 32 165 42 172"
          stroke="#7548E8"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M152 138C166 145 168 158 158 170"
          stroke="#7548E8"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
