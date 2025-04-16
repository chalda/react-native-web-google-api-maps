// Marker.tsx
import React, { useEffect, useRef } from "react";
import { Marker as GoogleMarker } from "@react-google-maps/api";
import { LatLng } from "./types";
import { normalizeImage } from "./utils/normalizeImage";
import { CalloutContext } from "./CalloutContext";

export interface MarkerProps {
    coordinate: LatLng;
    children?: React.ReactNode;
    title?: string;
    description?: string;
    image?: any;
    icon?: any;
    anchor?: { x: number; y: number };
    opacity?: number;
    draggable?: boolean;
    flat?: boolean;
    zIndex?: number;
    tracksViewChanges?: boolean;
    identifier?: string;
    onPress?: () => void;
    onDragStart?: () => void;
    onDrag?: () => void;
    onDragEnd?: (e: { latitude: number; longitude: number }) => void;
    map?: google.maps.Map; // Required for InfoWindow
}

const Marker: React.FC<MarkerProps> = ({
    coordinate,
    children,
    title,
    description,
    image,
    icon,
    anchor,
    opacity = 1,
    draggable = false,
    flat,
    zIndex,
    tracksViewChanges,
    identifier,
    onPress,
    onDragStart,
    onDrag,
    onDragEnd,
    map,
}) => {
    const markerRef = useRef<google.maps.Marker | null>(null);

    const position = {
        lat: coordinate.latitude,
        lng: coordinate.longitude,
    };

    let resolvedIcon;
    const normalized = normalizeImage(image);
    if (icon) {
        resolvedIcon = icon;
    } else if (typeof normalized === "string") {
        resolvedIcon = {
            url: normalized,
            scaledSize: new google.maps.Size(50, 50),
        };
    }

    const handleDragEnd = (e: google.maps.MapMouseEvent) => {
        const latLng = e.latLng;
        if (onDragEnd && latLng) {
            onDragEnd({
                latitude: latLng.lat(),
                longitude: latLng.lng(),
            });
        }
    };

    return (
        <CalloutContext.Provider
            value={{ markerInstance: markerRef.current!, mapInstance: map }}
        >
            <GoogleMarker
                onLoad={(marker) => (markerRef.current = marker)}
                position={position}
                title={title}
                label={description}
                draggable={draggable}
                opacity={opacity}
                zIndex={zIndex}
                icon={resolvedIcon}
                onClick={onPress}
                onDragStart={onDragStart}
                onDrag={onDrag}
                onDragEnd={handleDragEnd}
            />
            {children}
        </CalloutContext.Provider>
    );
};

export default Marker;
