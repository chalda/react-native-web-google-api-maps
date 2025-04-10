// Circle.tsx
import React from "react";
import { Circle as GoogleCircle } from "@react-google-maps/api";
import { LatLng } from "./types";

export interface CircleProps {
    center: LatLng;
    radius: number; // in meters
    strokeWidth?: number;
    strokeColor?: string;
    fillColor?: string;
    zIndex?: number;
    lineDashPattern?: number[]; // Not supported directly in Google Maps
    onPress?: () => void;
}

const Circle: React.FC<CircleProps> = ({
    center,
    radius,
    strokeWidth = 1,
    strokeColor = "#000",
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

    // Google Maps does not support dashed borders for circles

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
