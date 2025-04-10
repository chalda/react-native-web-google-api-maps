import React from "react";
import { LatLng } from "./types";
export interface CircleProps {
    center: LatLng;
    radius: number;
    strokeWidth?: number;
    strokeColor?: string;
    fillColor?: string;
    zIndex?: number;
    lineDashPattern?: number[];
    onPress?: () => void;
}
declare const Circle: React.FC<CircleProps>;
export default Circle;
