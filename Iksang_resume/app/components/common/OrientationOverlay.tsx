'use client';

import { useCallback, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

const OrientationOverlay = () => {
  const [isPortrait, setIsPortrait] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const checkOrientation = useCallback(() => {
    setIsPortrait(window.matchMedia('(orientation: portrait)').matches);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    checkOrientation();
    const mql = window.matchMedia('(orientation: portrait)');
    const handler = () => {
      checkOrientation();
      setDismissed(false);
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [checkOrientation]);

  if (!isMobile || !isPortrait || dismissed) return null;

  return (
    <div className="orientation-overlay" onClick={() => setDismissed(true)}>
      <div className="orientation-content">
        <div className="phone-icon">
          <svg
            width="48"
            height="80"
            viewBox="0 0 48 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="2"
              y="2"
              width="44"
              height="76"
              rx="8"
              stroke="white"
              strokeWidth="3"
              fill="none"
            />
            <circle cx="24" cy="70" r="3" fill="white" />
            <rect x="18" y="6" width="12" height="3" rx="1.5" fill="white" opacity="0.5" />
          </svg>
        </div>
        <p className="orientation-text">
          더 나은 경험을 위해<br />
          가로로 돌려주세요
        </p>
        <button className="orientation-dismiss" onClick={() => setDismissed(true)}>
          세로로 계속 보기
        </button>
      </div>
    </div>
  );
};

export default OrientationOverlay;
