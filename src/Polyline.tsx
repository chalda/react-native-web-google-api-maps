// Polyline.tsx
import React from "react";
import { Polyline as GooglePolyline } from "@react-google-maps/api";
import { LatLng } from "./types";

export interface PolylineProps {
    coordinates: LatLng[];
    strokeColor?: string;
    strokeWidth?: number;
    lineDashPattern?: number[]; // Not directly supported in Google Maps
    geodesic?: boolean;
    zIndex?: number;
    tappable?: boolean;
    onPress?: () => void;
}

const Polyline: React.FC<PolylineProps> = ({
    coordinates,
    strokeColor = "#000",
    strokeWidth = 1,
    lineDashPattern,
    geodesic = false,
    zIndex,
    tappable,
    onPress,
}) => {
    const options: google.maps.PolylineOptions = {
        strokeColor,
        strokeOpacity: 1.0,
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
        options.strokeOpacity = 0; // Must disable solid stroke to show dashed
    }

    return (
        <GooglePolyline
            path={coordinates.map((c) => ({
                lat: c.latitude,
                lng: c.longitude,
            }))}
            options={options}
            onClick={() => onPress?.()}
        />
    );
};

export default Polyline;
