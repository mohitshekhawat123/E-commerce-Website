import { useEffect, useRef } from 'react';

const useIdleTimeout = (onIdle, idleTime = 15 * 60 * 1000) => {
  const timeoutId = useRef(null);

  const handleIdle = () => {
    if (onIdle) {
      onIdle();
    }
  };

  const resetTimer = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(handleIdle, idleTime);
  };

  useEffect(() => {
    // List of events to listen to for user activity
    const events = [
      'mousemove',
      'mousedown',
      'keydown',
      'scroll',
      'touchstart',
    ];

    // Reset the timer when component mounts
    resetTimer();

    // Add event listeners
    const handleEvent = () => resetTimer();
    events.forEach((event) => window.addEventListener(event, handleEvent));

    // Cleanup function
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      events.forEach((event) => window.removeEventListener(event, handleEvent));
    };
  }, [idleTime, onIdle]); // Re-run if idleTime or onIdle changes

  return resetTimer;
};

export default useIdleTimeout;
