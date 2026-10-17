import React from "react";

interface BrandLogoIconProps {
  className?: string;
}

export function BrandLogoIcon({ className = "w-8 h-8" }: BrandLogoIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="brandBgGrad"
          x1="0"
          y1="0"
          x2="120"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="50%" stopColor="#171f33" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient
          id="brandBorderGrad"
          x1="0"
          y1="0"
          x2="120"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#818cf8" stopOpacity="0.65" />
          <stop offset="50%" stopColor="#6366f1" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient
          id="brandIndigoVibe"
          x1="20"
          y1="20"
          x2="95"
          y2="95"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#a5b4fc" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <linearGradient
          id="brandMintSpark"
          x1="65"
          y1="20"
          x2="100"
          y2="65"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
      </defs>

      {/* Rounded Squircle Background */}
      <rect
        x="4"
        y="4"
        width="112"
        height="112"
        rx="28"
        fill="url(#brandBgGrad)"
        stroke="url(#brandBorderGrad)"
        strokeWidth="3.5"
      />

      {/* Subtle Inner Ambient Glow */}
      <circle cx="60" cy="60" r="38" fill="#6366f1" fillOpacity="0.14" />

      {/* Top-Left Tile: Rounded App Block */}
      <rect
        x="26"
        y="28"
        width="28"
        height="28"
        rx="8"
        fill="url(#brandIndigoVibe)"
      />

      {/* Bottom-Left Tile: Circle ('ㅇ' motif of 아무거나) */}
      <circle
        cx="40"
        cy="78"
        r="13.5"
        fill="none"
        stroke="#a5b4fc"
        strokeWidth="6.5"
      />

      {/* Bottom-Right Tile: Vibe Code Bracket Block */}
      <rect
        x="64"
        y="64"
        width="28"
        height="28"
        rx="8"
        fill="#312e81"
        stroke="#818cf8"
        strokeWidth="2.5"
      />
      <path
        d="M74 74L70 78L74 82M82 74L86 78L82 82"
        stroke="#e0e7ff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Top-Right Tile: 4-Point Vibe Sparkle Star */}
      <path
        d="M80 18C80 30.5 89.5 40 102 40C89.5 40 80 49.5 80 62C80 49.5 70.5 40 58 40C70.5 40 80 30.5 80 18Z"
        fill="url(#brandMintSpark)"
      />
    </svg>
  );
}
