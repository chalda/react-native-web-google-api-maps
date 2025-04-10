// Circle.tsx
import React from "react";
import { Circle as GoogleCircle } from "@react-google-maps/api";
const Circle = ({ center, radius, strokeWidth = 1, strokeColor = "#000", fillColor = "rgba(0,0,0,0.1)", zIndex, lineDashPattern, onPress, }) => {
    const options = {
        strokeColor,
        strokeOpacity: 1,
        strokeWeight: strokeWidth,
        fillColor,
        fillOpacity: 1,
        zIndex,
        clickable: !!onPress,
    };
    // Google Maps does not support dashed borders for circles
    return (<GoogleCircle center={{ lat: center.latitude, lng: center.longitude }} radius={radius} options={options} onClick={() => onPress?.()}/>);
};
export default Circle;
