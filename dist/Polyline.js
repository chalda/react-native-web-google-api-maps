// Polyline.tsx
import React from "react";
import { Polyline as GooglePolyline } from "@react-google-maps/api";
import { normalizeCoordinates } from "./utils/normalizeCoordinates";
const Polyline = ({ coordinates, strokeColor = "#000", strokeWidth = 1, lineDashPattern, geodesic = false, zIndex, tappable, onPress, }) => {
    const options = {
        strokeColor,
        strokeOpacity: 1,
        strokeWeight: strokeWidth,
        geodesic,
        zIndex,
        clickable: tappable ?? !!onPress,
    };
    if (lineDashPattern) {
        options.icons = [
            {
                icon: { path: "M 0,-1 0,1", strokeOpacity: 1, scale: 4 },
                offset: "0",
                repeat: `${lineDashPattern[0] + (lineDashPattern[1] || 0)}px`,
            },
        ];
        options.strokeOpacity = 0; // Hide solid stroke when using dashed
    }
    return (<GooglePolyline path={normalizeCoordinates(coordinates)} options={options} onClick={() => onPress?.()}/>);
};
export default Polyline;
