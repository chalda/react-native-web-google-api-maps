// Marker.tsx
import React, { useRef } from "react";
import { Marker as GoogleMarker } from "@react-google-maps/api";
import { normalizeImage } from "./utils/normalizeImage";
import { CalloutContext } from "./CalloutContext";
const Marker = ({ coordinate, children, title, description, image, icon, anchor, opacity = 1, draggable = false, flat, // accepted but unused
tracksViewChanges, // accepted but unused
zIndex, identifier, // accepted but unused
onPress, onDragStart, onDrag, onDragEnd, map, }) => {
    const markerRef = useRef(null);
    const position = {
        lat: coordinate.latitude,
        lng: coordinate.longitude,
    };
    let resolvedIcon;
    if (icon) {
        resolvedIcon = icon;
    }
    else {
        const normalized = normalizeImage(image);
        if (normalized && typeof normalized === "string") {
            resolvedIcon = {
                url: normalized,
                scaledSize: new google.maps.Size(50, 50),
                anchor: anchor
                    ? new google.maps.Point(anchor.x * 50, anchor.y * 50)
                    : undefined,
            };
        }
    }
    const handleDragEnd = (e) => {
        const latLng = e.latLng;
        if (onDragEnd && latLng) {
            onDragEnd({
                latitude: latLng.lat(),
                longitude: latLng.lng(),
            });
        }
    };
    return (<>
            <GoogleMarker onLoad={(marker) => (markerRef.current = marker)} position={position} title={title} label={description} draggable={draggable} opacity={opacity} zIndex={zIndex} icon={resolvedIcon} onClick={onPress} onDragStart={onDragStart} onDrag={onDrag} onDragEnd={handleDragEnd}/>
            {/* Provide marker + map to any nested <Callout /> */}
            {children && (<CalloutContext.Provider value={{
                markerInstance: markerRef.current,
                mapInstance: map,
            }}>
                    {children}
                </CalloutContext.Provider>)}
        </>);
};
export default Marker;
