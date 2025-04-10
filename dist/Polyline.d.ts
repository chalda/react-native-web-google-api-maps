import React from "react";
import { LatLng } from "./types";
export interface PolylineProps {
    coordinates: LatLng[];
    strokeColor?: string;
    strokeWidth?: number;
    lineDashPattern?: number[];
    geodesic?: boolean;
    zIndex?: number;
    tappable?: boolean;
    onPress?: () => void;
}
declare const Polyline: React.FC<PolylineProps>;
export default Polyline;
