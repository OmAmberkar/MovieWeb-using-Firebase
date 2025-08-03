/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Eye, EyeOff, Mail, Phone, User, Lock } from "lucide-react";

// Lightweight animated illustration for registration
export const RegisterAnimation = () => {
  return (
    <div className="w-full max-w-6xl h-165 ml-20 mx-auto bg-gradient-to-br from-[#010e22] via-black to-[#010e22] rounded-2xl overflow-hidden shadow-[0px_0px_20px_2px_blue] ring-1 ring-blue-600">
      <div className="relative">
        <svg 
          viewBox="0 0 800 600" 
          className="w-full h-auto"
          style={{ minHeight: '400px' }}
        >
          <defs>
            <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#010e22">
                <animate attributeName="stop-color" 
                  values="#010e22;#0a1a3a;#010e22" 
                  dur="8s" 
                  repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#000000">
                <animate attributeName="stop-color" 
                  values="#000000;#010e22;#000000" 
                  dur="8s" 
                  repeatCount="indefinite" />
              </stop>
            </radialGradient>
            
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <rect width="800" height="600" fill="url(#bgGradient)" />

          {/* Registration themed elements */}
          <circle r="4" fill="#22c55e" opacity="0.7">
            <animateMotion dur="20s" repeatCount="indefinite" 
              path="M150,150 Q400,100 650,250 Q400,400 150,150" />
          </circle>
          
          <circle r="3" fill="#06b6d4" opacity="0.8">
            <animateMotion dur="16s" repeatCount="indefinite" 
              path="M250,500 Q500,350 550,150 Q300,250 250,500" />
          </circle>

          {/* Central welcome symbol */}
          <g transform="translate(400,300)">
            <circle r="60" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.5">
              <animate attributeName="r" values="60;80;60" dur="5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0.2;0.5" dur="5s" repeatCount="indefinite" />
            </circle>
            
            {/* Welcome star */}
            <polygon points="0,-25 7,-7 25,-7 12,5 18,23 0,15 -18,23 -12,5 -25,-7 -7,-7" 
              fill="#22c55e" opacity="0.8">
              <animateTransform attributeName="transform" type="rotate" 
                values="0;360" dur="30s" repeatCount="indefinite" />
            </polygon>
          </g>

          {/* Form field indicators */}
          <g transform="translate(150,120)">
            <rect width="30" height="30" fill="#06b6d4" opacity="0.4" rx="6">
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
            </rect>
          </g>

          <g transform="translate(620,180)">
            <circle r="15" fill="#10b981" opacity="0.4">
              <animate attributeName="r" values="15;20;15" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Bottom wave */}
          <path d="M0,520 Q400,470 800,520 L800,600 L0,600 Z" fill="#0a7490" opacity="0.3">
            <animateTransform attributeName="transform" type="translate" 
              values="0,0;-50,0;0,0" dur="10s" repeatCount="indefinite" />
          </path>

          {/* Connecting lines */}
          <line x1="100" y1="200" x2="300" y2="100" stroke="#22c55e" strokeWidth="1" opacity="0.3">
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="6s" repeatCount="indefinite" />
          </line>
          
          <line x1="500" y1="150" x2="700" y2="250" stroke="#06b6d4" strokeWidth="1" opacity="0.3">
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="7s" begin="2s" repeatCount="indefinite" />
          </line>
        </svg>
      </div>
      
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Join the Experience</h2>
        <p className="text-green-400">Create your cinematic account!</p>
      </div>
    </div>
  );
};