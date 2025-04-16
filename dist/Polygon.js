// Polygon.tsx
import React from "react";
import { Polygon as GooglePolygon } from "@react-google-maps/api";
import { normalizeCoordinates } from "./utils/normalizeCoordinates";
const Polygon = ({ coordinates, strokeColor = "#000", strokeWidth = 1, fillColor = "rgba(0,0,0,0.1)", zIndex, tappable, onPress, }) => {
    const options = {
        strokeColor,
        strokeWeight: strokeWidth,
        strokeOpacity: 1,
        fillColor,
        fillOpacity: 0.3,
        zIndex,
        clickable: tappable ?? !!onPress,
    };
    return (<GooglePolygon paths={normalizeCoordinates(coordinates)} options={options} onClick={() => onPress?.()}/>);
};
export default Polygon;
