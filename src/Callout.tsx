// Callout.tsx (web)
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";

interface CalloutProps {
    coordinate: { latitude: number; longitude: number };
    map?: google.maps.Map | null;
    content: React.ReactNode;
}

const Callout: React.FC<CalloutProps> = ({ coordinate, map, content }) => {
    const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
    const containerDivRef = useRef<HTMLDivElement | null>(null);
    const reactRootRef = useRef<ReturnType<typeof ReactDOM.createRoot> | null>(
        null,
    );

    useEffect(() => {
        if (!map) return;

        // Create container div if needed
        if (!containerDivRef.current) {
            containerDivRef.current = document.createElement("div");
        }

        // Mount React content into the div
        if (!reactRootRef.current && containerDivRef.current) {
            reactRootRef.current = ReactDOM.createRoot(containerDivRef.current);
        }

        if (reactRootRef.current) {
            reactRootRef.current.render(<>{content}</>);
        }

        if (!infoWindowRef.current) {
            infoWindowRef.current = new google.maps.InfoWindow({
                content: containerDivRef.current!,
                disableAutoPan: false,
            });
        }

        infoWindowRef.current.setPosition({
            lat: coordinate.latitude,
            lng: coordinate.longitude,
        });

        infoWindowRef.current.open(map);

        return () => {
            infoWindowRef.current?.close();
            reactRootRef.current?.unmount();
            infoWindowRef.current = null;
            containerDivRef.current = null;
            reactRootRef.current = null;
        };
    }, [map, coordinate.latitude, coordinate.longitude, content]);

    return null;
};

export default Callout;
