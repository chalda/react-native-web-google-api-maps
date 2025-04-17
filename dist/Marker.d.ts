import React from "react";
import { LatLng } from "./types";
export interface MarkerProps {
    coordinate: LatLng;
    children?: React.ReactNode;
    title?: string;
    description?: string;
    image?: any;
    icon?: any;
    anchor?: {
        x: number;
        y: number;
    };
    opacity?: number;
    draggable?: boolean;
    flat?: boolean;
    tracksViewChanges?: boolean;
    zIndex?: number;
    identifier?: string;
    onPress?: () => void;
    onDragStart?: () => void;
    onDrag?: () => void;
    onDragEnd?: (e: LatLng) => void;
    map?: google.maps.Map;
}
declare const Marker: React.FC<MarkerProps>;
export default Marker;
