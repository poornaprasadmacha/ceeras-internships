import React from 'react';

export interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * Official CSS3 Blue Shield vector logo
 */
export function CssLogo({ className = 'w-10 h-10', size }: LogoProps) {
  return (
    <svg
      viewBox="0 0 128 128"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="CSS3 logo"
    >
      <rect width="128" height="128" rx="20" fill="#1572B6" />
      <path d="M22 18L30 108L64 118L98 108L106 18H22Z" fill="#33A9DC" />
      <path d="M64 26V110L91 102L98 26H64Z" fill="#1572B6" opacity="0.3" />
      <path
        d="M40 38H88L86 52H64V64H84L82 86L64 91L46 86L45 74H57L58 80L64 82L70 80L71 74H43L40 38Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

/**
 * Official HTML5 Orange Shield vector logo
 */
export function HtmlLogo({ className = 'w-10 h-10', size }: LogoProps) {
  return (
    <svg
      viewBox="0 0 128 128"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="HTML5 logo"
    >
      <rect width="128" height="128" rx="20" fill="#E44D26" />
      <path d="M22 18L30 108L64 118L98 108L106 18H22Z" fill="#F16529" />
      <path d="M64 26V110L91 102L98 26H64Z" fill="#E44D26" opacity="0.4" />
      <path
        d="M40 38H88L86 52H52L54 64H84L82 86L64 91L46 86L45 74H57L58 80L64 82L70 80L71 74H43L40 38Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

/**
 * Official Python dual-snake vector logo
 */
export function PythonLogo({ className = 'w-10 h-10', size }: LogoProps) {
  return (
    <svg
      viewBox="0 0 128 128"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Python logo"
    >
      <path
        d="M63.385 0C30.655 0 32.705 14.195 32.705 14.195L32.74 28.89h31.14v4.425H20.08S0 30.985 0 63.85c0 32.86 17.515 31.7 17.515 31.7h10.45V80.895s-.575-17.525 17.235-17.525h29.835s16.66-.27 16.66-16.39V16.39S94.49 0 63.385 0zM47.79 9.87a4.91 4.91 0 11.005 9.82 4.91 4.91 0 01-.005-9.82z"
        fill="#3776AB"
      />
      <path
        d="M64.615 128c32.73 0 30.68-14.195 30.68-14.195l-.035-14.695H64.12v-4.425h43.8s20.08 2.33 20.08-30.535c0-32.865-17.515-31.7-17.515-31.7h-10.45v14.655s.575 17.525-17.235 17.525H32.965s-16.66.27-16.66 16.39v30.59s-2.8 16.39 28.31 16.39zM80.21 118.13a4.91 4.91 0 11-.005-9.82 4.91 4.91 0 01.005 9.82z"
        fill="#FFD43B"
      />
    </svg>
  );
}

/**
 * Official NumPy 3D Isometric vector logo
 */
export function NumpyLogo({ className = 'w-10 h-10', size }: LogoProps) {
  return (
    <svg
      viewBox="0 0 128 128"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="NumPy logo"
    >
      <rect width="128" height="128" rx="24" fill="#013243" />
      {/* Isometric cube grid with N */}
      <path
        d="M64 22L102 44V88L64 110L26 88V44L64 22Z"
        stroke="#4DABCF"
        strokeWidth="4"
        fill="#024059"
      />
      <path d="M64 22V66M64 66L102 88M64 66L26 88" stroke="#4DABCF" strokeWidth="4" />
      <path
        d="M44 54V80L52 68V94M76 54V80L84 68V94"
        stroke="#4DABCF"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Central bold N */}
      <path
        d="M48 50V78L80 50V78"
        stroke="#FFFFFF"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Official JavaScript vector badge logo
 */
export function JavaScriptLogo({ className = 'w-10 h-10', size }: LogoProps) {
  return (
    <svg
      viewBox="0 0 128 128"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="JavaScript logo"
    >
      <rect width="128" height="128" rx="20" fill="#F7DF1E" />
      <path
        d="M72.5 86.8c2.4 3.9 5.8 6.5 11.5 6.5 5 0 8.2-2.5 8.2-5.9 0-4.1-3.3-5.6-8.9-8l-3.1-1.3c-8.9-3.8-14.8-8.6-14.8-18.7 0-9.3 7.1-16.4 18.2-16.4 7.9 0 13.6 2.8 17.5 9.7l-9.1 5.8c-2-3.6-4.2-5-8.4-5-3.8 0-6.2 2.4-6.2 5.3 0 3.7 2.4 5.2 7.8 7.5l3.1 1.3c10.4 4.5 16.1 9.1 16.1 19.3 0 11-8.7 17.1-20.2 17.1-11.4 0-18.5-5.5-22.3-13.1l10.6-6.6zM28.4 87.8l9.6-5.8c1.9 3.3 3.6 6.1 7.2 6.1 3.7 0 6-1.5 6-7.2V43.5h12.5v37.6c0 12.3-7.2 17.9-17.7 17.9-9.5 0-15.1-4.8-17.6-11.2z"
        fill="#000000"
      />
    </svg>
  );
}

/**
 * Official Pandas / Tabular Data Science vector logo
 */
export function PandasLogo({ className = 'w-10 h-10', size }: LogoProps) {
  return (
    <svg
      viewBox="0 0 128 128"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Pandas Data Science logo"
    >
      <rect width="128" height="128" rx="20" fill="#130754" />
      {/* 4 classic Pandas color pillars */}
      <rect x="26" y="44" width="14" height="48" rx="7" fill="#E70488" />
      <rect x="46" y="28" width="14" height="68" rx="7" fill="#FFD43B" />
      <rect x="66" y="38" width="14" height="58" rx="7" fill="#00D2FF" />
      <rect x="86" y="52" width="14" height="38" rx="7" fill="#FFFFFF" />
      {/* Crossbar */}
      <circle cx="53" cy="72" r="5" fill="#130754" />
      <circle cx="73" cy="58" r="5" fill="#130754" />
    </svg>
  );
}

/**
 * Official SQL / Relational Database vector logo
 */
export function SqlLogo({ className = 'w-10 h-10', size }: LogoProps) {
  return (
    <svg
      viewBox="0 0 128 128"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="SQL Database logo"
    >
      <rect width="128" height="128" rx="20" fill="#0E5E77" />
      {/* Tier 1 cylinder */}
      <ellipse cx="64" cy="36" rx="38" ry="14" fill="#00A2B3" />
      <path
        d="M26 36V54C26 62 43 68 64 68C85 68 102 62 102 54V36"
        fill="#008D9B"
      />
      {/* Tier 2 cylinder */}
      <path
        d="M26 58V76C26 84 43 90 64 90C85 90 102 84 102 76V58"
        fill="#0A6C84"
      />
      {/* Tier 3 cylinder base */}
      <path
        d="M26 80V94C26 102 43 108 64 108C85 108 102 102 102 94V80"
        fill="#074B5C"
      />
      {/* SQL Bold Badge */}
      <rect x="36" y="56" width="56" height="26" rx="6" fill="#FFFFFF" />
      <text
        x="64"
        y="75"
        textAnchor="middle"
        fontFamily="Raleway, Inter, sans-serif"
        fontWeight="900"
        fontSize="16"
        fill="#0E5E77"
        letterSpacing="1"
      >
        SQL
      </text>
    </svg>
  );
}

/**
 * Official Scikit-Learn / Machine Learning vector logo
 */
export function ScikitLearnLogo({ className = 'w-10 h-10', size }: LogoProps) {
  return (
    <svg
      viewBox="0 0 128 128"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Scikit-Learn Machine Learning logo"
    >
      <rect width="128" height="128" rx="20" fill="#1E293B" />
      {/* Orange circle node */}
      <circle cx="48" cy="50" r="28" fill="#F89939" />
      {/* Blue circle node */}
      <circle cx="80" cy="78" r="28" fill="#3499CD" fillOpacity="0.9" />
      {/* Intersection & Neural Network lines */}
      <path
        d="M48 50L80 78"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="48" cy="50" r="7" fill="#FFFFFF" />
      <circle cx="80" cy="78" r="7" fill="#FFFFFF" />
      {/* Satellite node */}
      <circle cx="82" cy="42" r="12" fill="#3499CD" />
      <circle cx="46" cy="86" r="12" fill="#F89939" />
      <line x1="48" y1="50" x2="82" y2="42" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="80" y1="78" x2="46" y2="86" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" />
    </svg>
  );
}

/**
 * Official Data Science / Analytics vector logo
 */
export function DataScienceLogo({ className = 'w-10 h-10', size }: LogoProps) {
  return (
    <svg
      viewBox="0 0 128 128"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Data Science logo"
    >
      <rect width="128" height="128" rx="20" fill="#0C2340" />
      <defs>
        <linearGradient id="dsGrad" x1="64" y1="32" x2="64" y2="98" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00D2FF" stopOpacity="0.25" />
          <stop stopColor="#00D2FF" stopOpacity="0.0" />
        </linearGradient>
      </defs>
      {/* Distribution curve */}
      <path
        d="M20 98 C35 98, 45 32, 64 32 C83 32, 93 98, 108 98"
        stroke="#00D2FF"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="url(#dsGrad)"
      />
      {/* Trend line */}
      <line x1="28" y1="84" x2="100" y2="44" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="3 3" />
      {/* Data points */}
      <circle cx="36" cy="80" r="4" fill="#E70488" />
      <circle cx="52" cy="72" r="4.5" fill="#10B981" />
      <circle cx="68" cy="54" r="4.5" fill="#3B82F6" />
      <circle cx="84" cy="52" r="4" fill="#F59E0B" />
      <circle cx="96" cy="42" r="4" fill="#EC4899" />
    </svg>
  );
}

/**
 * Machine Learning Neural Vector Logo
 */
export function MachineLearningLogo({ className = 'w-10 h-10', size }: LogoProps) {
  return (
    <svg
      viewBox="0 0 128 128"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Machine Learning logo"
    >
      <rect width="128" height="128" rx="20" fill="#0F172A" />
      {/* Neural Network Nodes & Links */}
      <g stroke="#38BDF8" strokeWidth="2.5" strokeOpacity="0.6">
        <line x1="32" y1="40" x2="64" y2="30" />
        <line x1="32" y1="40" x2="64" y2="64" />
        <line x1="32" y1="64" x2="64" y2="30" />
        <line x1="32" y1="64" x2="64" y2="64" />
        <line x1="32" y1="64" x2="64" y2="98" />
        <line x1="32" y1="88" x2="64" y2="64" />
        <line x1="32" y1="88" x2="64" y2="98" />

        <line x1="64" y1="30" x2="96" y2="48" />
        <line x1="64" y1="30" x2="96" y2="80" />
        <line x1="64" y1="64" x2="96" y2="48" />
        <line x1="64" y1="64" x2="96" y2="80" />
        <line x1="64" y1="98" x2="96" y2="48" />
        <line x1="64" y1="98" x2="96" y2="80" />
      </g>
      {/* Layer 1 Nodes (Input) */}
      <circle cx="32" cy="40" r="7" fill="#818CF8" />
      <circle cx="32" cy="64" r="7" fill="#818CF8" />
      <circle cx="32" cy="88" r="7" fill="#818CF8" />

      {/* Layer 2 Nodes (Hidden) */}
      <circle cx="64" cy="30" r="8" fill="#38BDF8" />
      <circle cx="64" cy="64" r="8" fill="#38BDF8" />
      <circle cx="64" cy="98" r="8" fill="#38BDF8" />

      {/* Layer 3 Nodes (Output) */}
      <circle cx="96" cy="48" r="7" fill="#F43F5E" />
      <circle cx="96" cy="80" r="7" fill="#F43F5E" />
    </svg>
  );
}

/**
 * Official Git Distributed Version Control vector logo
 */
export function GitLogo({ className = 'w-10 h-10', size }: LogoProps) {
  return (
    <svg
      viewBox="0 0 128 128"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Git logo"
    >
      <rect width="128" height="128" rx="20" fill="#24292E" />
      {/* Rotated 45-deg diamond badge */}
      <g transform="translate(64, 64) rotate(45) translate(-42, -42)">
        <rect width="84" height="84" rx="16" fill="#F05032" />
        {/* Branch lines */}
        <line x1="28" y1="20" x2="28" y2="64" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
        <path d="M28 38 C40 38, 54 44, 54 56 L54 64" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" fill="none" />
        {/* Nodes */}
        <circle cx="28" cy="20" r="8" fill="#FFFFFF" />
        <circle cx="28" cy="64" r="8" fill="#FFFFFF" />
        <circle cx="54" cy="64" r="8" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

/**
 * Official GitHub vector silhouette logo
 */
export function GitHubLogo({ className = 'w-10 h-10', size }: LogoProps) {
  return (
    <svg
      viewBox="0 0 128 128"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="GitHub logo"
    >
      <rect width="128" height="128" rx="20" fill="#181717" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M64 20C39.696 20 20 39.696 20 64c0 19.444 12.61 35.94 30.096 41.748 2.2.404 3.004-.956 3.004-2.12 0-1.048-.04-3.824-.06-7.508-12.24 2.66-13.612-5.9-13.612-5.9-2.002-5.084-4.886-6.438-4.886-6.438-3.994-2.73.302-2.674.302-2.674 4.416.31 6.74 4.534 6.74 4.534 3.924 6.724 10.296 4.78 12.806 3.656.398-2.842 1.536-4.782 2.794-5.88-9.772-1.112-20.046-4.886-20.046-21.75 0-4.804 1.716-8.732 4.534-11.81-.454-1.112-1.966-5.588.43-11.644 0 0 3.696-1.182 12.106 4.512 3.51-0.976 7.276-1.464 11.018-1.482 3.742.018 7.508.506 11.018 1.482 8.41-5.694 12.106-4.512 12.106-4.512 2.396 6.056.884 10.532.43 11.644 2.818 3.078 4.534 7.006 4.534 11.81 0 16.908-10.294 20.626-20.09 21.714 1.578 1.36 2.986 4.044 2.986 8.15 0 5.882-.054 10.626-.054 12.07 0 1.176.794 2.544 3.024 2.112C95.408 99.924 108 83.434 108 64c0-24.304-19.696-44-44-44z"
        fill="#FFFFFF"
      />
    </svg>
  );
}


/**
 * Official Visual Studio Code origami ribbon vector logo
 */
export function VsCodeLogo({ className = 'w-10 h-10', size }: LogoProps) {
  return (
    <svg
      viewBox="0 0 128 128"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Visual Studio Code logo"
    >
      <rect width="128" height="128" rx="20" fill="#181824" />
      {/* VS Code origami folded ribbon */}
      <path
        d="M96 22L70 42L48 26L36 32V96L48 102L70 86L96 106V22Z"
        fill="#0066B8"
      />
      {/* Upper diagonal wing */}
      <path
        d="M96 22L48 58L36 32L78 20L96 22Z"
        fill="#1F8AD2"
      />
      {/* Lower diagonal wing */}
      <path
        d="M96 106L48 70L36 96L78 108L96 106Z"
        fill="#007ACC"
      />
      {/* Front right chevron */}
      <path
        d="M96 22L70 42V86L96 106V22Z"
        fill="#0098FF"
      />
      {/* Left chevron bow */}
      <path
        d="M48 26L36 32L24 44V84L36 96L48 102V26Z"
        fill="#005A9E"
        opacity="0.8"
      />
    </svg>
  );
}
