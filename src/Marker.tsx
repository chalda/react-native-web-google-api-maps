// Marker.tsx (web)
import React from "react";
import { Marker as GoogleMarker } from "@react-google-maps/api";
import { LatLng } from "./types";
import { normalizeImage } from "./utils/normalizeImage";

export interface MarkerProps {
    coordinate: LatLng;
    title?: string;
    description?: string;
    image?: any; // RN-style require(...)
    icon?: any; // raw Google Maps icon override
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
}

const Marker: React.FC<MarkerProps> = ({
    coordinate,
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
}) => {
    const position = {
        lat: coordinate.latitude,
        lng: coordinate.longitude,
    };

    let resolvedIcon: google.maps.Icon | undefined;

    if (icon) {
        resolvedIcon = icon;
    } else {
        const normalized = normalizeImage(image);
        if (typeof normalized === "string") {
            resolvedIcon = {
                url: normalized,
                scaledSize: new google.maps.Size(50, 50), // Customize size here
            };
        }
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
        <GoogleMarker
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
    );
};

export default Marker;
