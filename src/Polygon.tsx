// Polygon.tsx
import React from "react";
import { Polygon as GooglePolygon } from "@react-google-maps/api";
import { LatLng } from "./types";
import { normalizeCoordinates } from "./utils/normalizeCoordinates";

export interface PolygonProps {
    coordinates: LatLng[];
    strokeColor?: string;
    strokeWidth?: number;
    fillColor?: string;
    zIndex?: number;
    tappable?: boolean;
    onPress?: () => void;
}

const Polygon: React.FC<PolygonProps> = ({
    coordinates,
    strokeColor = "#000",
    strokeWidth = 1,
    fillColor = "rgba(0,0,0,0.1)",
    zIndex,
    tappable,
    onPress,
}) => {
    const options: google.maps.PolygonOptions = {
        strokeColor,
        strokeWeight: strokeWidth,
        strokeOpacity: 1,
        fillColor,
        fillOpacity: 0.3,
        zIndex,
        clickable: tappable ?? !!onPress,
    };

    return (
        <GooglePolygon
            paths={normalizeCoordinates(coordinates)}
            options={options}
            onClick={() => onPress?.()}
        />
    );
};

export default Polygon;
