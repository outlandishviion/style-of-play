import { useEffect, useState } from 'react';

type GaugeState = 'low' | 'lowMedium' | 'medium' | 'mediumHigh' | 'high' | 'veryHigh' | 'notApplicable' | 'adjusted';

interface GaugeDisplayProps {
  state: GaugeState;
}

export function GaugeDisplay({ state }: GaugeDisplayProps) {
  const [key, setKey] = useState(0);

  // Reset animation when state changes
  useEffect(() => {
    setKey(prev => prev + 1);
  }, [state]);

  const getSvgContent = () => {
    switch (state) {
      case 'low':
        return <LowGauge key={key} />;
      case 'lowMedium':
        return <LowMediumGauge key={key} />;
      case 'medium':
        return <MediumGauge key={key} />;
      case 'mediumHigh':
        return <MediumHighGauge key={key} />;
      case 'high':
        return <HighGauge key={key} />;
      case 'veryHigh':
        return <VeryHighGauge key={key} />;
      case 'notApplicable':
        return <NotApplicableGauge key={key} />;
      case 'adjusted':
        return <AdjustedGauge key={key} />;
      default:
        return <VeryHighGauge key={key} />;
    }
  };

  return <div className="w-full h-full">{getSvgContent()}</div>;
}

// Low (15%)
function LowGauge() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 203 118" fill="none" className="w-full h-full">
      <style>{`
        @keyframes draw-arc { from { stroke-dashoffset: 296; } to { stroke-dashoffset: 251.6; } }
        @keyframes rotate-needle { from { transform: rotate(-90deg); } to { transform: rotate(-67.5deg); } }
        @keyframes rotate-clip-wipe { from { transform: rotate(-180deg); } to { transform: rotate(-153deg); } }
        @keyframes fade-in-dial { from { opacity: 0; } to { opacity: 0.8; } }
        @keyframes fade-in-fill { from { opacity: 0; } to { opacity: 0.3; } }
        @keyframes fade-in-arc { from { opacity: 0; } to { opacity: 1; } }
        
        .dial-bg { stroke: #888; opacity: 0; animation: fade-in-dial 0.8s ease forwards; animation-delay: 0.2s; }
        .arc-path { stroke-dasharray: 296; stroke-dashoffset: 296; opacity: 0; animation: draw-arc 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards, fade-in-arc 0.1s ease forwards; animation-delay: 0.2s; }
        .needle-group { transform-origin: 100.937px 103.199px; transform: rotate(-90deg); animation: rotate-needle 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; animation-delay: 0.2s; }
        .clip-rect { transform-origin: 100.937px 103.199px; transform: rotate(-180deg); animation: rotate-clip-wipe 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; animation-delay: 0.2s; }
        .inner-fill { opacity: 0; animation: fade-in-fill 0.8s ease forwards; animation-delay: 0.2s; }
        .circle-base { opacity: 1; }
        @media (prefers-reduced-motion: reduce) { .arc-path, .needle-group, .dial-bg, .inner-fill, .clip-rect { animation: none !important; } .dial-bg { opacity: 0.8; } .circle-base { opacity: 1; } .inner-fill { opacity: 0.3; } .arc-path { stroke-dashoffset: 251.6; opacity: 1; } .needle-group { transform: rotate(-67.5deg); } .clip-rect { transform: rotate(-153deg); } }
      `}</style>
      <defs>
        <linearGradient id="arc-gradient-low" x1="199.386" y1="102.229" x2="3.02059" y2="104.031" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF522C"/>
          <stop offset="0.25" stopColor="#F8BB44"/>
          <stop offset="0.5" stopColor="#FFD500"/>
          <stop offset="0.75" stopColor="#28FFBB"/>
          <stop offset="1" stopColor="#5BD3E9"/>
        </linearGradient>
        <linearGradient id="fill-gradient-low" x1="176.486" y1="102.455" x2="25.7965" y2="103.838" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF522C"/>
          <stop offset="0.25" stopColor="#F8BB44"/>
          <stop offset="0.5" stopColor="#FFD500"/>
          <stop offset="0.75" stopColor="#28FFBB"/>
          <stop offset="1" stopColor="#5BD3E9"/>
        </linearGradient>
        <clipPath id="fill-clip-low">
          <rect className="clip-rect" x="0" y="0" width="203" height="103.2" />
        </clipPath>
      </defs>
      <path className="dial-bg" d="M195.117 103.201C195.117 90.833 192.681 78.5863 187.948 67.1598C183.215 55.7334 176.278 45.3511 167.532 36.6057C158.787 27.8602 148.405 20.923 136.978 16.19C125.552 11.457 113.305 9.021 100.937 9.021C88.5691 9.02099 76.3224 11.457 64.896 16.19C53.4695 20.923 43.0872 27.8602 34.3418 36.6056C25.5964 45.351 18.6591 55.7333 13.9261 67.1598C9.19313 78.5862 6.75709 90.833 6.75708 103.201" stroke="#888" strokeWidth="3" strokeLinejoin="bevel" />
      <path className="inner-fill" d="M28.6638 103.201C28.6638 93.6793 30.5453 84.2515 34.2001 75.4593C37.8549 66.667 43.211 58.6836 49.9607 51.9678C56.7104 45.2519 64.7207 39.936 73.5312 36.3254C82.3417 32.7148 91.7788 30.8808 101.3 30.9286C110.822 30.9765 120.24 32.9053 129.014 36.6043C137.787 40.3033 145.744 45.6995 152.426 52.4828C159.108 59.2662 164.383 67.3031 167.949 76.1316C171.516 84.9601 173.302 94.4063 173.207 103.927L100.937 103.201L28.6638 103.201Z" fill="url(#fill-gradient-low)" clipPath="url(#fill-clip-low)" />
      <path className="arc-path" d="M6.75708 103.201C6.75708 90.7932 9.20883 78.5078 13.9715 67.0505C18.7341 55.5932 25.7137 45.19 34.5093 36.4385C43.3049 27.687 53.7431 20.7597 65.2242 16.0548C76.7052 11.3498 89.0028 8.95982 101.41 9.02219C113.818 9.08456 126.091 11.598 137.524 16.4182C148.957 21.2384 159.325 28.2702 168.032 37.1097C176.74 45.9492 183.614 56.422 188.262 67.9266C192.909 79.4312 195.237 91.7406 195.112 104.148" stroke="url(#arc-gradient-low)" strokeWidth="10.4644" strokeLinejoin="round" />
      <g className="needle-group">
        <path d="M101.453 71.6331C101.436 71.5181 101.369 71.4078 101.275 71.3265C101.181 71.2452 101.069 71.1995 100.953 71.1995C100.837 71.1995 100.724 71.2452 100.63 71.3265C100.537 71.4078 100.469 71.5181 100.453 71.6331C100.453 71.6331 100.453 71.6331 100.453 71.6331C100.377 72.1592 100.302 72.6853 100.227 73.2114C98.8722 82.6813 97.5175 92.1513 96.1628 101.621C96.0875 102.147 96.0123 102.673 95.937 103.2C99.2808 103.2 102.625 103.2 105.968 103.2C105.893 102.673 105.818 102.147 105.742 101.621C104.388 92.1513 103.033 82.6813 101.678 73.2114C101.603 72.6853 101.528 72.1592 101.453 71.6331Z" fill="white"/>
      </g>
      <circle className="circle-base" cx="100.937" cy="103.199" r="8" fill="#29A8AC"/>
      <circle className="circle-base" cx="100.937" cy="103.199" r="4" fill="white"/>
    </svg>
  );
}

// Low-Medium (30%)
function LowMediumGauge() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 203 118" fill="none" className="w-full h-full">
      <style>{`
        @keyframes draw-arc { from { stroke-dashoffset: 296; } to { stroke-dashoffset: 207.2; } }
        @keyframes rotate-needle { from { transform: rotate(-90deg); } to { transform: rotate(-36deg); } }
        @keyframes rotate-clip-wipe { from { transform: rotate(-180deg); } to { transform: rotate(-126deg); } }
        @keyframes fade-in-dial { from { opacity: 0; } to { opacity: 0.8; } }
        @keyframes fade-in-fill { from { opacity: 0; } to { opacity: 0.3; } }
        @keyframes fade-in-arc { from { opacity: 0; } to { opacity: 1; } }
        
        .dial-bg { stroke: #888; opacity: 0; animation: fade-in-dial 0.8s ease forwards; animation-delay: 0.2s; }
        .arc-path { stroke-dasharray: 296; stroke-dashoffset: 296; opacity: 0; animation: draw-arc 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards, fade-in-arc 0.1s ease forwards; animation-delay: 0.2s; }
        .needle-group { transform-origin: 100.937px 103.199px; transform: rotate(-90deg); animation: rotate-needle 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; animation-delay: 0.2s; }
        .clip-rect { transform-origin: 100.937px 103.199px; transform: rotate(-180deg); animation: rotate-clip-wipe 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; animation-delay: 0.2s; }
        .inner-fill { opacity: 0; animation: fade-in-fill 0.8s ease forwards; animation-delay: 0.2s; }
        .circle-base { opacity: 1; }
        @media (prefers-reduced-motion: reduce) { .arc-path, .needle-group, .dial-bg, .inner-fill, .clip-rect { animation: none !important; } .dial-bg { opacity: 0.8; } .circle-base { opacity: 1; } .inner-fill { opacity: 0.3; } .arc-path { stroke-dashoffset: 207.2; opacity: 1; } .needle-group { transform: rotate(-36deg); } .clip-rect { transform: rotate(-126deg); } }
      `}</style>
      <defs>
        <linearGradient id="arc-gradient-lowmed" x1="199.386" y1="102.229" x2="3.02059" y2="104.031" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF522C"/>
          <stop offset="0.25" stopColor="#F8BB44"/>
          <stop offset="0.5" stopColor="#FFD500"/>
          <stop offset="0.75" stopColor="#28FFBB"/>
          <stop offset="1" stopColor="#5BD3E9"/>
        </linearGradient>
        <linearGradient id="fill-gradient-lowmed" x1="176.486" y1="102.455" x2="25.7965" y2="103.838" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF522C"/>
          <stop offset="0.25" stopColor="#F8BB44"/>
          <stop offset="0.5" stopColor="#FFD500"/>
          <stop offset="0.75" stopColor="#28FFBB"/>
          <stop offset="1" stopColor="#5BD3E9"/>
        </linearGradient>
        <clipPath id="fill-clip-lowmed">
          <rect className="clip-rect" x="0" y="0" width="203" height="103.2" />
        </clipPath>
      </defs>
      <path className="dial-bg" d="M195.117 103.201C195.117 90.833 192.681 78.5863 187.948 67.1598C183.215 55.7334 176.278 45.3511 167.532 36.6057C158.787 27.8602 148.405 20.923 136.978 16.19C125.552 11.457 113.305 9.021 100.937 9.021C88.5691 9.02099 76.3224 11.457 64.896 16.19C53.4695 20.923 43.0872 27.8602 34.3418 36.6056C25.5964 45.351 18.6591 55.7333 13.9261 67.1598C9.19313 78.5862 6.75709 90.833 6.75708 103.201" stroke="#888" strokeWidth="3" strokeLinejoin="bevel" />
      <path className="inner-fill" d="M28.6638 103.201C28.6638 93.6793 30.5453 84.2515 34.2001 75.4593C37.8549 66.667 43.211 58.6836 49.9607 51.9678C56.7104 45.2519 64.7207 39.936 73.5312 36.3254C82.3417 32.7148 91.7788 30.8808 101.3 30.9286C110.822 30.9765 120.24 32.9053 129.014 36.6043C137.787 40.3033 145.744 45.6995 152.426 52.4828C159.108 59.2662 164.383 67.3031 167.949 76.1316C171.516 84.9601 173.302 94.4063 173.207 103.927L100.937 103.201L28.6638 103.201Z" fill="url(#fill-gradient-lowmed)" clipPath="url(#fill-clip-lowmed)" />
      <path className="arc-path" d="M6.75708 103.201C6.75708 90.7932 9.20883 78.5078 13.9715 67.0505C18.7341 55.5932 25.7137 45.19 34.5093 36.4385C43.3049 27.687 53.7431 20.7597 65.2242 16.0548C76.7052 11.3498 89.0028 8.95982 101.41 9.02219C113.818 9.08456 126.091 11.598 137.524 16.4182C148.957 21.2384 159.325 28.2702 168.032 37.1097C176.74 45.9492 183.614 56.422 188.262 67.9266C192.909 79.4312 195.237 91.7406 195.112 104.148" stroke="url(#arc-gradient-lowmed)" strokeWidth="10.4644" strokeLinejoin="round" />
      <g className="needle-group">
        <path d="M101.453 71.6331C101.436 71.5181 101.369 71.4078 101.275 71.3265C101.181 71.2452 101.069 71.1995 100.953 71.1995C100.837 71.1995 100.724 71.2452 100.63 71.3265C100.537 71.4078 100.469 71.5181 100.453 71.6331C100.453 71.6331 100.453 71.6331 100.453 71.6331C100.377 72.1592 100.302 72.6853 100.227 73.2114C98.8722 82.6813 97.5175 92.1513 96.1628 101.621C96.0875 102.147 96.0123 102.673 95.937 103.2C99.2808 103.2 102.625 103.2 105.968 103.2C105.893 102.673 105.818 102.147 105.742 101.621C104.388 92.1513 103.033 82.6813 101.678 73.2114C101.603 72.6853 101.528 72.1592 101.453 71.6331Z" fill="white"/>
      </g>
      <circle className="circle-base" cx="100.937" cy="103.199" r="8" fill="#29A8AC"/>
      <circle className="circle-base" cx="100.937" cy="103.199" r="4" fill="white"/>
    </svg>
  );
}

// Medium (50%)
function MediumGauge() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 203 118" fill="none" className="w-full h-full">
      <style>{`
        @keyframes draw-arc { from { stroke-dashoffset: 296; } to { stroke-dashoffset: 148; } }
        @keyframes rotate-needle { from { transform: rotate(-90deg); } to { transform: rotate(0deg); } }
        @keyframes rotate-clip-wipe { from { transform: rotate(-180deg); } to { transform: rotate(-90deg); } }
        @keyframes fade-in-dial { from { opacity: 0; } to { opacity: 0.8; } }
        @keyframes fade-in-fill { from { opacity: 0; } to { opacity: 0.3; } }
        @keyframes fade-in-arc { from { opacity: 0; } to { opacity: 1; } }
        
        .dial-bg { stroke: #888; opacity: 0; animation: fade-in-dial 0.8s ease forwards; animation-delay: 0.2s; }
        .arc-path { stroke-dasharray: 296; stroke-dashoffset: 296; opacity: 0; animation: draw-arc 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards, fade-in-arc 0.1s ease forwards; animation-delay: 0.2s; }
        .needle-group { transform-origin: 100.937px 103.199px; transform: rotate(-90deg); animation: rotate-needle 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; animation-delay: 0.2s; }
        .clip-rect { transform-origin: 100.937px 103.199px; transform: rotate(-180deg); animation: rotate-clip-wipe 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; animation-delay: 0.2s; }
        .inner-fill { opacity: 0; animation: fade-in-fill 0.8s ease forwards; animation-delay: 0.2s; }
        .circle-base { opacity: 1; }
        @media (prefers-reduced-motion: reduce) { .arc-path, .needle-group, .dial-bg, .inner-fill, .clip-rect { animation: none !important; } .dial-bg { opacity: 0.8; } .circle-base { opacity: 1; } .inner-fill { opacity: 0.3; } .arc-path { stroke-dashoffset: 148; opacity: 1; } .needle-group { transform: rotate(0deg); } .clip-rect { transform: rotate(-90deg); } }
      `}</style>
      <defs>
        <linearGradient id="arc-gradient-med" x1="199.386" y1="102.229" x2="3.02059" y2="104.031" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF522C"/>
          <stop offset="0.25" stopColor="#F8BB44"/>
          <stop offset="0.5" stopColor="#FFD500"/>
          <stop offset="0.75" stopColor="#28FFBB"/>
          <stop offset="1" stopColor="#5BD3E9"/>
        </linearGradient>
        <linearGradient id="fill-gradient-med" x1="176.486" y1="102.455" x2="25.7965" y2="103.838" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF522C"/>
          <stop offset="0.25" stopColor="#F8BB44"/>
          <stop offset="0.5" stopColor="#FFD500"/>
          <stop offset="0.75" stopColor="#28FFBB"/>
          <stop offset="1" stopColor="#5BD3E9"/>
        </linearGradient>
        <clipPath id="fill-clip-med">
          <rect className="clip-rect" x="0" y="0" width="203" height="103.2" />
        </clipPath>
      </defs>
      <path className="dial-bg" d="M195.117 103.201C195.117 90.833 192.681 78.5863 187.948 67.1598C183.215 55.7334 176.278 45.3511 167.532 36.6057C158.787 27.8602 148.405 20.923 136.978 16.19C125.552 11.457 113.305 9.021 100.937 9.021C88.5691 9.02099 76.3224 11.457 64.896 16.19C53.4695 20.923 43.0872 27.8602 34.3418 36.6056C25.5964 45.351 18.6591 55.7333 13.9261 67.1598C9.19313 78.5862 6.75709 90.833 6.75708 103.201" stroke="#888" strokeWidth="3" strokeLinejoin="bevel" />
      <path className="inner-fill" d="M28.6638 103.201C28.6638 93.6793 30.5453 84.2515 34.2001 75.4593C37.8549 66.667 43.211 58.6836 49.9607 51.9678C56.7104 45.2519 64.7207 39.936 73.5312 36.3254C82.3417 32.7148 91.7788 30.8808 101.3 30.9286C110.822 30.9765 120.24 32.9053 129.014 36.6043C137.787 40.3033 145.744 45.6995 152.426 52.4828C159.108 59.2662 164.383 67.3031 167.949 76.1316C171.516 84.9601 173.302 94.4063 173.207 103.927L100.937 103.201L28.6638 103.201Z" fill="url(#fill-gradient-med)" clipPath="url(#fill-clip-med)" />
      <path className="arc-path" d="M6.75708 103.201C6.75708 90.7932 9.20883 78.5078 13.9715 67.0505C18.7341 55.5932 25.7137 45.19 34.5093 36.4385C43.3049 27.687 53.7431 20.7597 65.2242 16.0548C76.7052 11.3498 89.0028 8.95982 101.41 9.02219C113.818 9.08456 126.091 11.598 137.524 16.4182C148.957 21.2384 159.325 28.2702 168.032 37.1097C176.74 45.9492 183.614 56.422 188.262 67.9266C192.909 79.4312 195.237 91.7406 195.112 104.148" stroke="url(#arc-gradient-med)" strokeWidth="10.4644" strokeLinejoin="round" />
      <g className="needle-group">
        <path d="M101.453 71.6331C101.436 71.5181 101.369 71.4078 101.275 71.3265C101.181 71.2452 101.069 71.1995 100.953 71.1995C100.837 71.1995 100.724 71.2452 100.63 71.3265C100.537 71.4078 100.469 71.5181 100.453 71.6331C100.453 71.6331 100.453 71.6331 100.453 71.6331C100.377 72.1592 100.302 72.6853 100.227 73.2114C98.8722 82.6813 97.5175 92.1513 96.1628 101.621C96.0875 102.147 96.0123 102.673 95.937 103.2C99.2808 103.2 102.625 103.2 105.968 103.2C105.893 102.673 105.818 102.147 105.742 101.621C104.388 92.1513 103.033 82.6813 101.678 73.2114C101.603 72.6853 101.528 72.1592 101.453 71.6331Z" fill="white"/>
      </g>
      <circle className="circle-base" cx="100.937" cy="103.199" r="8" fill="#29A8AC"/>
      <circle className="circle-base" cx="100.937" cy="103.199" r="4" fill="white"/>
    </svg>
  );
}

// Medium-High (70%)
function MediumHighGauge() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 203 118" fill="none" className="w-full h-full">
      <style>{`
        @keyframes draw-arc { from { stroke-dashoffset: 296; } to { stroke-dashoffset: 88.8; } }
        @keyframes rotate-needle { from { transform: rotate(-90deg); } to { transform: rotate(36deg); } }
        @keyframes rotate-clip-wipe { from { transform: rotate(-180deg); } to { transform: rotate(-54deg); } }
        @keyframes fade-in-dial { from { opacity: 0; } to { opacity: 0.8; } }
        @keyframes fade-in-fill { from { opacity: 0; } to { opacity: 0.3; } }
        @keyframes fade-in-arc { from { opacity: 0; } to { opacity: 1; } }
        
        .dial-bg { stroke: #888; opacity: 0; animation: fade-in-dial 0.8s ease forwards; animation-delay: 0.2s; }
        .arc-path { stroke-dasharray: 296; stroke-dashoffset: 296; opacity: 0; animation: draw-arc 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards, fade-in-arc 0.1s ease forwards; animation-delay: 0.2s; }
        .needle-group { transform-origin: 100.937px 103.199px; transform: rotate(-90deg); animation: rotate-needle 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; animation-delay: 0.2s; }
        .clip-rect { transform-origin: 100.937px 103.199px; transform: rotate(-180deg); animation: rotate-clip-wipe 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; animation-delay: 0.2s; }
        .inner-fill { opacity: 0; animation: fade-in-fill 0.8s ease forwards; animation-delay: 0.2s; }
        .circle-base { opacity: 1; }
        @media (prefers-reduced-motion: reduce) { .arc-path, .needle-group, .dial-bg, .inner-fill, .clip-rect { animation: none !important; } .dial-bg { opacity: 0.8; } .circle-base { opacity: 1; } .inner-fill { opacity: 0.3; } .arc-path { stroke-dashoffset: 88.8; opacity: 1; } .needle-group { transform: rotate(36deg); } .clip-rect { transform: rotate(-54deg); } }
      `}</style>
      <defs>
        <linearGradient id="arc-gradient-medhigh" x1="199.386" y1="102.229" x2="3.02059" y2="104.031" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF522C"/>
          <stop offset="0.25" stopColor="#F8BB44"/>
          <stop offset="0.5" stopColor="#FFD500"/>
          <stop offset="0.75" stopColor="#28FFBB"/>
          <stop offset="1" stopColor="#5BD3E9"/>
        </linearGradient>
        <linearGradient id="fill-gradient-medhigh" x1="176.486" y1="102.455" x2="25.7965" y2="103.838" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF522C"/>
          <stop offset="0.25" stopColor="#F8BB44"/>
          <stop offset="0.5" stopColor="#FFD500"/>
          <stop offset="0.75" stopColor="#28FFBB"/>
          <stop offset="1" stopColor="#5BD3E9"/>
        </linearGradient>
        <clipPath id="fill-clip-medhigh">
          <rect className="clip-rect" x="0" y="0" width="203" height="103.2" />
        </clipPath>
      </defs>
      <path className="dial-bg" d="M195.117 103.201C195.117 90.833 192.681 78.5863 187.948 67.1598C183.215 55.7334 176.278 45.3511 167.532 36.6057C158.787 27.8602 148.405 20.923 136.978 16.19C125.552 11.457 113.305 9.021 100.937 9.021C88.5691 9.02099 76.3224 11.457 64.896 16.19C53.4695 20.923 43.0872 27.8602 34.3418 36.6056C25.5964 45.351 18.6591 55.7333 13.9261 67.1598C9.19313 78.5862 6.75709 90.833 6.75708 103.201" stroke="#888" strokeWidth="3" strokeLinejoin="bevel" />
      <path className="inner-fill" d="M28.6638 103.201C28.6638 93.6793 30.5453 84.2515 34.2001 75.4593C37.8549 66.667 43.211 58.6836 49.9607 51.9678C56.7104 45.2519 64.7207 39.936 73.5312 36.3254C82.3417 32.7148 91.7788 30.8808 101.3 30.9286C110.822 30.9765 120.24 32.9053 129.014 36.6043C137.787 40.3033 145.744 45.6995 152.426 52.4828C159.108 59.2662 164.383 67.3031 167.949 76.1316C171.516 84.9601 173.302 94.4063 173.207 103.927L100.937 103.201L28.6638 103.201Z" fill="url(#fill-gradient-medhigh)" clipPath="url(#fill-clip-medhigh)" />
      <path className="arc-path" d="M6.75708 103.201C6.75708 90.7932 9.20883 78.5078 13.9715 67.0505C18.7341 55.5932 25.7137 45.19 34.5093 36.4385C43.3049 27.687 53.7431 20.7597 65.2242 16.0548C76.7052 11.3498 89.0028 8.95982 101.41 9.02219C113.818 9.08456 126.091 11.598 137.524 16.4182C148.957 21.2384 159.325 28.2702 168.032 37.1097C176.74 45.9492 183.614 56.422 188.262 67.9266C192.909 79.4312 195.237 91.7406 195.112 104.148" stroke="url(#arc-gradient-medhigh)" strokeWidth="10.4644" strokeLinejoin="round" />
      <g className="needle-group">
        <path d="M101.453 71.6331C101.436 71.5181 101.369 71.4078 101.275 71.3265C101.181 71.2452 101.069 71.1995 100.953 71.1995C100.837 71.1995 100.724 71.2452 100.63 71.3265C100.537 71.4078 100.469 71.5181 100.453 71.6331C100.453 71.6331 100.453 71.6331 100.453 71.6331C100.377 72.1592 100.302 72.6853 100.227 73.2114C98.8722 82.6813 97.5175 92.1513 96.1628 101.621C96.0875 102.147 96.0123 102.673 95.937 103.2C99.2808 103.2 102.625 103.2 105.968 103.2C105.893 102.673 105.818 102.147 105.742 101.621C104.388 92.1513 103.033 82.6813 101.678 73.2114C101.603 72.6853 101.528 72.1592 101.453 71.6331Z" fill="white"/>
      </g>
      <circle className="circle-base" cx="100.937" cy="103.199" r="8" fill="#29A8AC"/>
      <circle className="circle-base" cx="100.937" cy="103.199" r="4" fill="white"/>
    </svg>
  );
}

// High (85%)
function HighGauge() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 203 118" fill="none" className="w-full h-full">
      <style>{`
        @keyframes draw-arc { from { stroke-dashoffset: 296; } to { stroke-dashoffset: 44.4; } }
        @keyframes rotate-needle { from { transform: rotate(-90deg); } to { transform: rotate(63deg); } }
        @keyframes rotate-clip-wipe { from { transform: rotate(-180deg); } to { transform: rotate(-27deg); } }
        @keyframes fade-in-dial { from { opacity: 0; } to { opacity: 0.8; } }
        @keyframes fade-in-fill { from { opacity: 0; } to { opacity: 0.3; } }
        @keyframes fade-in-arc { from { opacity: 0; } to { opacity: 1; } }
        
        .dial-bg { stroke: #888; opacity: 0; animation: fade-in-dial 0.8s ease forwards; animation-delay: 0.2s; }
        .arc-path { stroke-dasharray: 296; stroke-dashoffset: 296; opacity: 0; animation: draw-arc 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards, fade-in-arc 0.1s ease forwards; animation-delay: 0.2s; }
        .needle-group { transform-origin: 100.937px 103.199px; transform: rotate(-90deg); animation: rotate-needle 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; animation-delay: 0.2s; }
        .clip-rect { transform-origin: 100.937px 103.199px; transform: rotate(-180deg); animation: rotate-clip-wipe 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; animation-delay: 0.2s; }
        .inner-fill { opacity: 0; animation: fade-in-fill 0.8s ease forwards; animation-delay: 0.2s; }
        .circle-base { opacity: 1; }
        @media (prefers-reduced-motion: reduce) { .arc-path, .needle-group, .dial-bg, .inner-fill, .clip-rect { animation: none !important; } .dial-bg { opacity: 0.8; } .circle-base { opacity: 1; } .inner-fill { opacity: 0.3; } .arc-path { stroke-dashoffset: 44.4; opacity: 1; } .needle-group { transform: rotate(63deg); } .clip-rect { transform: rotate(-27deg); } }
      `}</style>
      <defs>
        <linearGradient id="arc-gradient-high" x1="199.386" y1="102.229" x2="3.02059" y2="104.031" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF522C"/>
          <stop offset="0.25" stopColor="#F8BB44"/>
          <stop offset="0.5" stopColor="#FFD500"/>
          <stop offset="0.75" stopColor="#28FFBB"/>
          <stop offset="1" stopColor="#5BD3E9"/>
        </linearGradient>
        <linearGradient id="fill-gradient-high" x1="176.486" y1="102.455" x2="25.7965" y2="103.838" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF522C"/>
          <stop offset="0.25" stopColor="#F8BB44"/>
          <stop offset="0.5" stopColor="#FFD500"/>
          <stop offset="0.75" stopColor="#28FFBB"/>
          <stop offset="1" stopColor="#5BD3E9"/>
        </linearGradient>
        <clipPath id="fill-clip-high">
          <rect className="clip-rect" x="0" y="0" width="203" height="103.2" />
        </clipPath>
      </defs>
      <path className="dial-bg" d="M195.117 103.201C195.117 90.833 192.681 78.5863 187.948 67.1598C183.215 55.7334 176.278 45.3511 167.532 36.6057C158.787 27.8602 148.405 20.923 136.978 16.19C125.552 11.457 113.305 9.021 100.937 9.021C88.5691 9.02099 76.3224 11.457 64.896 16.19C53.4695 20.923 43.0872 27.8602 34.3418 36.6056C25.5964 45.351 18.6591 55.7333 13.9261 67.1598C9.19313 78.5862 6.75709 90.833 6.75708 103.201" stroke="#888" strokeWidth="3" strokeLinejoin="bevel" />
      <path className="inner-fill" d="M28.6638 103.201C28.6638 93.6793 30.5453 84.2515 34.2001 75.4593C37.8549 66.667 43.211 58.6836 49.9607 51.9678C56.7104 45.2519 64.7207 39.936 73.5312 36.3254C82.3417 32.7148 91.7788 30.8808 101.3 30.9286C110.822 30.9765 120.24 32.9053 129.014 36.6043C137.787 40.3033 145.744 45.6995 152.426 52.4828C159.108 59.2662 164.383 67.3031 167.949 76.1316C171.516 84.9601 173.302 94.4063 173.207 103.927L100.937 103.201L28.6638 103.201Z" fill="url(#fill-gradient-high)" clipPath="url(#fill-clip-high)" />
      <path className="arc-path" d="M6.75708 103.201C6.75708 90.7932 9.20883 78.5078 13.9715 67.0505C18.7341 55.5932 25.7137 45.19 34.5093 36.4385C43.3049 27.687 53.7431 20.7597 65.2242 16.0548C76.7052 11.3498 89.0028 8.95982 101.41 9.02219C113.818 9.08456 126.091 11.598 137.524 16.4182C148.957 21.2384 159.325 28.2702 168.032 37.1097C176.74 45.9492 183.614 56.422 188.262 67.9266C192.909 79.4312 195.237 91.7406 195.112 104.148" stroke="url(#arc-gradient-high)" strokeWidth="10.4644" strokeLinejoin="round" />
      <g className="needle-group">
        <path d="M101.453 71.6331C101.436 71.5181 101.369 71.4078 101.275 71.3265C101.181 71.2452 101.069 71.1995 100.953 71.1995C100.837 71.1995 100.724 71.2452 100.63 71.3265C100.537 71.4078 100.469 71.5181 100.453 71.6331C100.453 71.6331 100.453 71.6331 100.453 71.6331C100.377 72.1592 100.302 72.6853 100.227 73.2114C98.8722 82.6813 97.5175 92.1513 96.1628 101.621C96.0875 102.147 96.0123 102.673 95.937 103.2C99.2808 103.2 102.625 103.2 105.968 103.2C105.893 102.673 105.818 102.147 105.742 101.621C104.388 92.1513 103.033 82.6813 101.678 73.2114C101.603 72.6853 101.528 72.1592 101.453 71.6331Z" fill="white"/>
      </g>
      <circle className="circle-base" cx="100.937" cy="103.199" r="8" fill="#29A8AC"/>
      <circle className="circle-base" cx="100.937" cy="103.199" r="4" fill="white"/>
    </svg>
  );
}

// Very High (95%)
function VeryHighGauge() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 203 118" fill="none" className="w-full h-full">
      <style>{`
        @keyframes draw-arc { from { stroke-dashoffset: 296; } to { stroke-dashoffset: 14.8; } }
        @keyframes rotate-needle { from { transform: rotate(-90deg); } to { transform: rotate(81deg); } }
        @keyframes rotate-clip-wipe { from { transform: rotate(-180deg); } to { transform: rotate(-9deg); } }
        @keyframes fade-in-dial { from { opacity: 0; } to { opacity: 0.8; } }
        @keyframes fade-in-fill { from { opacity: 0; } to { opacity: 0.3; } }
        @keyframes fade-in-arc { from { opacity: 0; } to { opacity: 1; } }
        
        .dial-bg { stroke: #888; opacity: 0; animation: fade-in-dial 0.8s ease forwards; animation-delay: 0.2s; }
        .arc-path { stroke-dasharray: 296; stroke-dashoffset: 296; opacity: 0; animation: draw-arc 1.5s cubic-bezier(0.22, 1, 0.36, .9) forwards, fade-in-arc 0.1s ease forwards; animation-delay: 0.2s; }
        .needle-group { transform-origin: 100.937px 103.199px; transform: rotate(-90deg); animation: rotate-needle 1.5s cubic-bezier(0.22, 1, 0.36, .9) forwards; animation-delay: 0.2s; }
        .clip-rect { transform-origin: 100.937px 103.199px; transform: rotate(-180deg); animation: rotate-clip-wipe 1.5s cubic-bezier(0.22, 1, 0.36, .9) forwards; animation-delay: 0.2s; }
        .inner-fill { opacity: 0; animation: fade-in-fill 0.8s ease forwards; animation-delay: 0.2s; }
        .circle-base { opacity: 1; }
        @media (prefers-reduced-motion: reduce) { .arc-path, .needle-group, .dial-bg, .inner-fill, .clip-rect { animation: none !important; } .dial-bg { opacity: 0.8; } .circle-base { opacity: 1; } .inner-fill { opacity: 0.3; } .arc-path { stroke-dashoffset: 14.8; opacity: 1; } .needle-group { transform: rotate(81deg); } .clip-rect { transform: rotate(-9deg); } }
      `}</style>
      <defs>
        <linearGradient id="arc-gradient-veryhigh" x1="199.386" y1="102.229" x2="3.02059" y2="104.031" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF522C"/>
          <stop offset="0.25" stopColor="#F8BB44"/>
          <stop offset="0.5" stopColor="#FFD500"/>
          <stop offset="0.75" stopColor="#28FFBB"/>
          <stop offset="1" stopColor="#5BD3E9"/>
        </linearGradient>
        <linearGradient id="fill-gradient-veryhigh" x1="176.486" y1="102.455" x2="25.7965" y2="103.838" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF522C"/>
          <stop offset="0.25" stopColor="#F8BB44"/>
          <stop offset="0.5" stopColor="#FFD500"/>
          <stop offset="0.75" stopColor="#28FFBB"/>
          <stop offset="1" stopColor="#5BD3E9"/>
        </linearGradient>
        <clipPath id="fill-clip-veryhigh">
          <rect className="clip-rect" x="0" y="0" width="203" height="103.2" />
        </clipPath>
      </defs>
      <path className="dial-bg" d="M195.117 103.201C195.117 90.833 192.681 78.5863 187.948 67.1598C183.215 55.7334 176.278 45.3511 167.532 36.6057C158.787 27.8602 148.405 20.923 136.978 16.19C125.552 11.457 113.305 9.021 100.937 9.021C88.5691 9.02099 76.3224 11.457 64.896 16.19C53.4695 20.923 43.0872 27.8602 34.3418 36.6056C25.5964 45.351 18.6591 55.7333 13.9261 67.1598C9.19313 78.5862 6.75709 90.833 6.75708 103.201" stroke="#888" strokeWidth="3" strokeLinejoin="bevel" />
      <path className="inner-fill" d="M28.6638 103.201C28.6638 93.6793 30.5453 84.2515 34.2001 75.4593C37.8549 66.667 43.211 58.6836 49.9607 51.9678C56.7104 45.2519 64.7207 39.936 73.5312 36.3254C82.3417 32.7148 91.7788 30.8808 101.3 30.9286C110.822 30.9765 120.24 32.9053 129.014 36.6043C137.787 40.3033 145.744 45.6995 152.426 52.4828C159.108 59.2662 164.383 67.3031 167.949 76.1316C171.516 84.9601 173.302 94.4063 173.207 103.927L100.937 103.201L28.6638 103.201Z" fill="url(#fill-gradient-veryhigh)" clipPath="url(#fill-clip-veryhigh)" />
      <path className="arc-path" d="M6.75708 103.201C6.75708 90.7932 9.20883 78.5078 13.9715 67.0505C18.7341 55.5932 25.7137 45.19 34.5093 36.4385C43.3049 27.687 53.7431 20.7597 65.2242 16.0548C76.7052 11.3498 89.0028 8.95982 101.41 9.02219C113.818 9.08456 126.091 11.598 137.524 16.4182C148.957 21.2384 159.325 28.2702 168.032 37.1097C176.74 45.9492 183.614 56.422 188.262 67.9266C192.909 79.4312 195.237 91.7406 195.112 104.148" stroke="url(#arc-gradient-veryhigh)" strokeWidth="10.4644" strokeLinejoin="round" />
      <g className="needle-group">
        <path d="M101.453 71.6331C101.436 71.5181 101.369 71.4078 101.275 71.3265C101.181 71.2452 101.069 71.1995 100.953 71.1995C100.837 71.1995 100.724 71.2452 100.63 71.3265C100.537 71.4078 100.469 71.5181 100.453 71.6331C100.453 71.6331 100.453 71.6331 100.453 71.6331C100.377 72.1592 100.302 72.6853 100.227 73.2114C98.8722 82.6813 97.5175 92.1513 96.1628 101.621C96.0875 102.147 96.0123 102.673 95.937 103.2C99.2808 103.2 102.625 103.2 105.968 103.2C105.893 102.673 105.818 102.147 105.742 101.621C104.388 92.1513 103.033 82.6813 101.678 73.2114C101.603 72.6853 101.528 72.1592 101.453 71.6331Z" fill="white"/>
      </g>
      <circle className="circle-base" cx="100.937" cy="103.199" r="8" fill="#29A8AC"/>
      <circle className="circle-base" cx="100.937" cy="103.199" r="4" fill="white"/>
    </svg>
  );
}

// Not Applicable (Static)
function NotApplicableGauge() {
  return (
    <svg viewBox="0 0 203 118" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <style>{`
        .dial-bg { opacity: 0; animation: fade-in-dial 0.8s ease forwards; animation-delay: 0.2s; }
        @keyframes fade-in-dial { from { opacity: 0; } to { opacity: 0.8; } }
        @media (prefers-reduced-motion: reduce) { .dial-bg { animation: none !important; opacity: 0.8; } }
      `}</style>
      <path className="dial-bg" d="M195.117 103.201C195.117 90.833 192.681 78.5863 187.948 67.1598C183.215 55.7334 176.278 45.3511 167.532 36.6057C158.787 27.8602 148.405 20.923 136.978 16.19C125.552 11.457 113.305 9.021 100.937 9.021C88.5694 9.02099 76.3226 11.457 64.8962 16.19C53.4698 20.923 43.0874 27.8602 34.342 36.6056C25.5966 45.351 18.6594 55.7333 13.9264 67.1598C9.19337 78.5862 6.75733 90.833 6.75732 103.201" stroke="#828282" strokeWidth="3" strokeLinejoin="bevel"/>
    </svg>
  );
}

// Adjusted (90-degree gap animation)
function AdjustedGauge() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 203 118" fill="none" className="w-full h-full">
      <style>{`
        @keyframes rotate-mask-left {
          from { transform: rotate(0deg); }
          to { transform: rotate(-45deg); }
        }
        @keyframes rotate-mask-right {
          from { transform: rotate(0deg); }
          to { transform: rotate(45deg); }
        }
        @keyframes fade-in-dial { from { opacity: 0; } to { opacity: 0.8; } }
        @keyframes fade-in-fill { from { opacity: 0; } to { opacity: 0.3; } }
        
        .dial-bg { stroke: #888; opacity: 0; animation: fade-in-dial 0.8s ease forwards; animation-delay: 0.2s; }
        .inner-fill { opacity: 0; animation: fade-in-fill 0.8s ease forwards; animation-delay: 0.2s; }
        .circle-base { opacity: 1; }
        
        .mask-rect-left {
          transform-origin: 100.937px 103.199px;
          transform: rotate(0deg);
          animation: rotate-mask-left 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.2s;
        }
        .mask-rect-right {
          transform-origin: 100.937px 103.199px;
          transform: rotate(0deg);
          animation: rotate-mask-right 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.2s;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .dial-bg, .inner-fill, .mask-rect-left, .mask-rect-right { animation: none !important; }
          .dial-bg { opacity: 0.8; }
          .circle-base { opacity: 1; }
          .inner-fill { opacity: 0.3; }
          .mask-rect-left { transform: rotate(-45deg); }
          .mask-rect-right { transform: rotate(45deg); }
        }
      `}</style>
      <defs>
        <linearGradient id="fill-gradient-adj" x1="176.486" y1="102.455" x2="25.7965" y2="103.838" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF522C"/>
          <stop offset="0.25" stopColor="#F8BB44"/>
          <stop offset="0.5" stopColor="#FFD500"/>
          <stop offset="0.75" stopColor="#28FFBB"/>
          <stop offset="1" stopColor="#5BD3E9"/>
        </linearGradient>
        
        <mask id="fill-mask">
          <rect width="203" height="118" fill="white"/>
          <rect className="mask-rect-left" x="0" y="0" width="101" height="103.2" fill="black" />
          <rect className="mask-rect-right" x="100.9" y="0" width="102.1" height="103.2" fill="black" />
        </mask>
      </defs>
      
      <path className="dial-bg" d="M195.117 103.201C195.117 90.833 192.681 78.5863 187.948 67.1598C183.215 55.7334 176.278 45.3511 167.532 36.6057C158.787 27.8602 148.405 20.923 136.978 16.19C125.552 11.457 113.305 9.021 100.937 9.021C88.5691 9.02099 76.3224 11.457 64.896 16.19C53.4695 20.923 43.0872 27.8602 34.3418 36.6056C25.5964 45.351 18.6591 55.7333 13.9261 67.1598C9.19313 78.5862 6.75709 90.833 6.75708 103.201" stroke="#888" strokeWidth="3" strokeLinejoin="bevel" />
      
      <path className="inner-fill" d="M28.6638 103.201C28.6638 93.6793 30.5453 84.2515 34.2001 75.4593C37.8549 66.667 43.211 58.6836 49.9607 51.9678C56.7104 45.2519 64.7207 39.936 73.5312 36.3254C82.3417 32.7148 91.7788 30.8808 101.3 30.9286C110.822 30.9765 120.24 32.9053 129.014 36.6043C137.787 40.3033 145.744 45.6995 152.426 52.4828C159.108 59.2662 164.383 67.3031 167.949 76.1316C171.516 84.9601 173.302 94.4063 173.207 103.927L100.937 103.201L28.6638 103.201Z" fill="url(#fill-gradient-adj)" mask="url(#fill-mask)" />
      
      <circle className="circle-base" cx="100.937" cy="103.199" r="8" fill="#29A8AC"/>
      <circle className="circle-base" cx="100.937" cy="103.199" r="4" fill="white"/>
    </svg>
  );
}
