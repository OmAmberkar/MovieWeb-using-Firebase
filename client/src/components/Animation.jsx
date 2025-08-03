import React from 'react';

export const CoolAnimatedIllustration = () => {
  return (
    <div className="w-full max-w-6xl h-130  ml-10 bg-gradient-to-br from-[#010e22] via-black to-[#010e22] rounded-2xl overflow-hidden shadow-[0px_0px_20px_2px_blue] ring-1 ring-blue-600">
      <div className="relative">
        <svg 
          viewBox="0 0 800 600" 
          className="w-full h-auto"
          style={{ minHeight: '400px' }}
        >
          <defs>
            {/* Background gradient */}
            <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#010e22">
                <animate attributeName="stop-color" 
                  values="#010e22;#0a1a3a;#010e22" 
                  dur="6s" 
                  repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#000000">
                <animate attributeName="stop-color" 
                  values="#000000;#010e22;#000000" 
                  dur="6s" 
                  repeatCount="indefinite" />
              </stop>
            </radialGradient>
            
            {/* Simple glow filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Central gradient */}
            <radialGradient id="centralGradient">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#0a7490" />
            </radialGradient>
          </defs>

          {/* Background */}
          <rect width="800" height="600" fill="url(#bgGradient)" />

          {/* Simple floating particles */}
          <circle r="3" fill="#22c55e" opacity="0.6">
            <animateMotion dur="15s" repeatCount="indefinite" 
              path="M100,100 Q400,50 700,200 Q400,350 100,100" />
          </circle>
          
          <circle r="2" fill="#06b6d4" opacity="0.8">
            <animateMotion dur="12s" repeatCount="indefinite" 
              path="M200,500 Q500,300 600,100 Q300,200 200,500" />
          </circle>
          
          <circle r="4" fill="#10b981" opacity="0.5">
            <animateMotion dur="18s" repeatCount="indefinite" 
              path="M700,400 Q300,500 100,300 Q500,200 700,400" />
          </circle>

          {/* Central pulsing orb */}
          <g transform="translate(400,300)">
            <circle r="50" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.4">
              <animate attributeName="r" values="50;70;50" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.1;0.4" dur="4s" repeatCount="indefinite" />
            </circle>
            
            <circle r="30" fill="url(#centralGradient)" filter="url(#glow)">
              <animate attributeName="r" values="30;40;30" dur="3s" repeatCount="indefinite" />
            </circle>

            {/* Simple rotating elements */}
            <g>
              <animateTransform attributeName="transform" type="rotate" 
                values="0;360" dur="20s" repeatCount="indefinite" />
              
              <circle cx="60" cy="0" r="6" fill="#22c55e" opacity="0.8">
                <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
              </circle>
              
              <circle cx="-60" cy="0" r="6" fill="#06b6d4" opacity="0.8">
                <animate attributeName="r" values="6;10;6" dur="2s" begin="1s" repeatCount="indefinite" />
              </circle>
              
              <circle cx="0" cy="60" r="6" fill="#10b981" opacity="0.8">
                <animate attributeName="r" values="6;10;6" dur="2s" begin="0.5s" repeatCount="indefinite" />
              </circle>
              
              <circle cx="0" cy="-60" r="6" fill="#eab308" opacity="0.8">
                <animate attributeName="r" values="6;10;6" dur="2s" begin="1.5s" repeatCount="indefinite" />
              </circle>
            </g>
          </g>

          {/* Simple wave at bottom */}
          <path d="M0,500 Q400,450 800,500 L800,600 L0,600 Z" fill="#0a7490" opacity="0.3">
            <animateTransform attributeName="transform" type="translate" 
              values="0,0;-100,0;0,0" dur="8s" repeatCount="indefinite" />
          </path>

          {/* Floating geometric shapes */}
          <polygon points="150,120 180,140 170,180 140,170 130,140" fill="#22c55e" opacity="0.3">
            <animateTransform attributeName="transform" type="rotate" 
              values="0 150 150;360 150 150" dur="25s" repeatCount="indefinite" />
          </polygon>

          <rect x="620" y="80" width="40" height="40" fill="#06b6d4" opacity="0.3" rx="8">
            <animateTransform attributeName="transform" type="rotate" 
              values="360 640 100;0 640 100" dur="20s" repeatCount="indefinite" />
          </rect>

          {/* Simple shooting stars */}
          <line x1="0" y1="80" x2="100" y2="180" stroke="#eab308" strokeWidth="2" opacity="0">
            <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="translate" 
              values="0,0;800,400;0,0" dur="3s" repeatCount="indefinite" />
          </line>
          
          <line x1="0" y1="150" x2="100" y2="250" stroke="#06b6d4" strokeWidth="2" opacity="0">
            <animate attributeName="opacity" values="0;1;0" dur="4s" begin="2s" repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="translate" 
              values="0,0;800,350;0,0" dur="4s" begin="2s" repeatCount="indefinite" />
          </line>

          {/* Subtle background stars */}
          <circle cx="150" cy="100" r="1" fill="#22c55e">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="5s" repeatCount="indefinite" />
          </circle>
          <circle cx="300" cy="80" r="1" fill="#06b6d4">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="4s" begin="1s" repeatCount="indefinite" />
          </circle>
          <circle cx="500" cy="120" r="1" fill="#eab308">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="6s" begin="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="650" cy="200" r="1" fill="#10b981">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" begin="0.5s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
    </div>
  );
}