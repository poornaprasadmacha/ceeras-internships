import React from 'react';

export interface LogoProps {
  className?: string;
  size?: number;
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
