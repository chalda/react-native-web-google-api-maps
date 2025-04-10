// Callout.tsx
import React, { useEffect, useRef } from 'react';

interface CalloutProps {
  coordinate: { latitude: number; longitude: number };
  content: string | JSX.Element;
  map?: google.maps.Map | null;
}

const Callout: React.FC<CalloutProps> = ({ coordinate, content, map }) => {
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  useEffect(() => {
    if (!map) return;

    if (!infoWindowRef.current) {
      infoWindowRef.current = new google.maps.InfoWindow();
    }

    infoWindowRef.current.setPosition({
      lat: coordinate.latitude,
      lng: coordinate.longitude,
    });

    infoWindowRef.current.setContent(
      typeof content === 'string' ? content : '<div>Custom JSX not supported yet</div>'
    );

    infoWindowRef.current.open(map);

    return () => {
      infoWindowRef.current?.close();
    };
  }, [map, coordinate, content]);

  return null;
};

export default Callout;


//Note: Rendering raw JSX inside an InfoWindow requires React portal tricks or createRoot.
