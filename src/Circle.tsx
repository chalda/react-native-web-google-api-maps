// Circle.tsx
import React from "react";
import { Circle as GoogleCircle } from "@react-google-maps/api";
import { LatLng } from "./types";

export interface CircleProps {
    center: LatLng;
    radius: number; //in meters
    strokeColor?: string;
    strokeWidth?: number;
    fillColor?: string;
    zIndex?: number;
    lineDashPattern?: number[];
    onPress?: () => void;
}

const Circle: React.FC<CircleProps> = ({
    center,
    radius,
    strokeColor = "#000",
    strokeWidth = 1,
    fillColor = "rgba(0,0,0,0.1)",
    zIndex,
    lineDashPattern,
    onPress,
}) => {
    const options: google.maps.CircleOptions = {
        strokeColor,
        strokeOpacity: 1,
        strokeWeight: strokeWidth,
        fillColor,
        fillOpacity: 1,
        zIndex,
        clickable: !!onPress,
    };

    // Note: Google Maps does not support dashed circles natively

    return (
        <GoogleCircle
            center={{ lat: center.latitude, lng: center.longitude }}
            radius={radius}
            options={options}
            onClick={() => onPress?.()}
        />
    );
};

export default Circle;
