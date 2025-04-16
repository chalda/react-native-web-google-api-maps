import React from "react";
import { LatLng } from "./types";
export interface PolygonProps {
    coordinates: LatLng[];
    strokeColor?: string;
    strokeWidth?: number;
    fillColor?: string;
    zIndex?: number;
    tappable?: boolean;
    onPress?: () => void;
}
declare const Polygon: React.FC<PolygonProps>;
export default Polygon;
