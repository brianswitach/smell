import React from 'react';

interface FallbackImageProps {
  index?: number;
  className?: string;
}

export function FallbackPerfumeImage({ index = 1, className = 'w-full h-full' }: FallbackImageProps) {
  // Use modulo to keep index within range 1-5
  const safeIndex = ((index - 1) % 5) + 1;
  
  // Array of different colors for variety
  const colors = [
    { primary: '#7C3AED', secondary: '#A78BFA' }, // Purple
    { primary: '#059669', secondary: '#34D399' }, // Emerald
    { primary: '#D97706', secondary: '#FBBF24' }, // Amber
    { primary: '#DC2626', secondary: '#F87171' }, // Red
    { primary: '#1D4ED8', secondary: '#60A5FA' }, // Blue
  ];
  
  const { primary, secondary } = colors[safeIndex - 1];
  
  return (
    <svg 
      viewBox="0 0 200 300"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={`perfume-gradient-${safeIndex}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primary} />
          <stop offset="100%" stopColor={secondary} />
        </linearGradient>
      </defs>
      
      {/* Bottle shape varies based on index */}
      {safeIndex === 1 && (
        // Elegant tall bottle
        <g>
          <rect x="70" y="40" width="60" height="200" rx="10" fill={`url(#perfume-gradient-${safeIndex})`} />
          <rect x="80" y="10" width="40" height="30" rx="5" fill={primary} />
          <circle cx="100" cy="10" r="8" fill={secondary} />
        </g>
      )}
      
      {safeIndex === 2 && (
        // Round bottle
        <g>
          <path d="M70,90 v120 a30,30 0 0,0 60,0 v-120 z" fill={`url(#perfume-gradient-${safeIndex})`} />
          <rect x="85" y="60" width="30" height="30" rx="5" fill={primary} />
          <circle cx="100" cy="60" r="15" fill={secondary} />
        </g>
      )}
      
      {safeIndex === 3 && (
        // Diamond-shaped bottle
        <g>
          <path d="M100,90 l40,50 l-40,100 l-40,-100 z" fill={`url(#perfume-gradient-${safeIndex})`} />
          <rect x="90" y="60" width="20" height="30" rx="5" fill={primary} />
          <circle cx="100" cy="60" r="10" fill={secondary} />
        </g>
      )}
      
      {safeIndex === 4 && (
        // Wide bottle
        <g>
          <path d="M60,100 h80 v140 a10,10 0 0,1 -10,10 h-60 a10,10 0 0,1 -10,-10 z" fill={`url(#perfume-gradient-${safeIndex})`} />
          <rect x="85" y="70" width="30" height="30" rx="5" fill={primary} />
          <circle cx="100" cy="70" r="12" fill={secondary} />
        </g>
      )}
      
      {safeIndex === 5 && (
        // Unique asymmetrical bottle
        <g>
          <path d="M70,100 q30,-30 60,0 v150 a15,15 0 0,1 -15,15 h-30 a15,15 0 0,1 -15,-15 z" fill={`url(#perfume-gradient-${safeIndex})`} />
          <rect x="85" y="70" width="30" height="30" rx="10" fill={primary} />
          <circle cx="100" cy="70" r="10" fill={secondary} />
        </g>
      )}
      
      {/* Spray/cap detail */}
      <rect x="95" y="40" width="10" height="20" rx="2" fill="#333" />
      
      {/* Name placeholder */}
      <rect x="50" y="260" width="100" height="20" rx="5" fill="#f0f0f0" opacity="0.3" />
      
      {/* smell&co branding */}
      <text x="100" y="275" fontSize="10" textAnchor="middle" fill="#fff">smell&co</text>
    </svg>
  );
} 