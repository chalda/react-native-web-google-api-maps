// Marker.tsx
import React from "react";
import { Marker as GoogleMarker } from "@react-google-maps/api";
const Marker = ({ coordinate, title, description, pinColor, anchor, opacity, draggable, flat, zIndex, icon, onPress, onDragStart, onDrag, onDragEnd, }) => {
    return (<GoogleMarker position={{ lat: coordinate.latitude, lng: coordinate.longitude }} label={title} title={description} draggable={draggable} icon={icon ?? undefined} opacity={opacity} zIndex={zIndex} onClick={() => onPress?.()} onDragStart={() => onDragStart?.()} onDrag={() => onDrag?.()} onDragEnd={(e) => onDragEnd?.({
            latitude: e.latLng?.lat() ?? 0,
            longitude: e.latLng?.lng() ?? 0,
        })}/>);
};
export default Marker;
