// Callout.tsx (web)
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { useCalloutContext } from './CalloutContext';

interface CalloutProps {
  children: React.ReactNode;
}

const Callout: React.FC<CalloutProps> = ({ children }) => {
  const { markerInstance, mapInstance } = useCalloutContext();

  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<ReturnType<typeof ReactDOM.createRoot> | null>(null);

  useEffect(() => {
    if (!markerInstance || !mapInstance) return;

    containerRef.current = document.createElement('div');
    rootRef.current = ReactDOM.createRoot(containerRef.current);
    rootRef.current.render(<>{children}</>);

    infoWindowRef.current = new google.maps.InfoWindow({
      content: containerRef.current,
    });

    infoWindowRef.current.open({
      map: mapInstance,
      anchor: markerInstance,
    });

    return () => {
      infoWindowRef.current?.close();
      rootRef.current?.unmount();
      containerRef.current = null;
      infoWindowRef.current = null;
      rootRef.current = null;
    };
  }, [markerInstance, mapInstance, children]);

  return null;
};

export default Callout;
