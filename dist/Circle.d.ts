import React from "react";
import { LatLng } from "./types";
export interface CircleProps {
    center: LatLng;
    radius: number;
    strokeColor?: string;
    strokeWidth?: number;
    fillColor?: string;
    zIndex?: number;
    lineDashPattern?: number[];
    onPress?: () => void;
}
declare const Circle: React.FC<CircleProps>;
export default Circle;
