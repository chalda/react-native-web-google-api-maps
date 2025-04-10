// Marker.tsx
import React from "react";
import { Marker as GoogleMarker } from "@react-google-maps/api";
import { LatLng } from "./types";

export interface MarkerProps {
    coordinate: LatLng;
    title?: string;
    description?: string;
    pinColor?: string;
    anchor?: { x: number; y: number };
    opacity?: number;
    draggable?: boolean;
    flat?: boolean;
    zIndex?: number;
    tracksViewChanges?: boolean;
    icon?: string;
    onPress?: () => void;
    onDragStart?: () => void;
    onDrag?: () => void;
    onDragEnd?: (e: LatLng) => void;
}

const Marker: React.FC<MarkerProps> = ({
    coordinate,
    title,
    description,
    pinColor,
    anchor,
    opacity,
    draggable,
    flat,
    zIndex,
    icon,
    onPress,
    onDragStart,
    onDrag,
    onDragEnd,
}) => {
    return (
        <GoogleMarker
            position={{ lat: coordinate.latitude, lng: coordinate.longitude }}
            label={title}
            title={description}
            draggable={draggable}
            icon={icon ?? undefined}
            opacity={opacity}
            zIndex={zIndex}
            onClick={() => onPress?.()}
            onDragStart={() => onDragStart?.()}
            onDrag={() => onDrag?.()}
            onDragEnd={(e) =>
                onDragEnd?.({
                    latitude: e.latLng?.lat() ?? 0,
                    longitude: e.latLng?.lng() ?? 0,
                })
            }
        />
    );
};

export default Marker;
