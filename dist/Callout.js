// Callout.tsx (web)
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { useCalloutContext } from './CalloutContext';
const Callout = ({ children }) => {
    const { markerInstance, mapInstance } = useCalloutContext();
    const infoWindowRef = useRef(null);
    const containerRef = useRef(null);
    const rootRef = useRef(null);
    useEffect(() => {
        if (!markerInstance || !mapInstance)
            return;
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
