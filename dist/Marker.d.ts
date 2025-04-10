import React from "react";
import { LatLng } from "./types";
export interface MarkerProps {
    coordinate: LatLng;
    title?: string;
    description?: string;
    pinColor?: string;
    anchor?: {
        x: number;
        y: number;
    };
    opacity?: number;
    draggable?: boolean;
    flat?: boolean;
    zIndex?: number;
    tracksViewChanges?: boolean;
    icon?: string;
    onPress?: () => void;
    onDragStart?: () => void;
    onDrag?: () => void;
    onDragEnd?: (e: LatLng) => void;
}
declare const Marker: React.FC<MarkerProps>;
export default Marker;
