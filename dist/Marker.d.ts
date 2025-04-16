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
    zIndex?: number;
    tracksViewChanges?: boolean;
    identifier?: string;
    onPress?: () => void;
    onDragStart?: () => void;
    onDrag?: () => void;
    onDragEnd?: (e: {
        latitude: number;
        longitude: number;
    }) => void;
    map?: google.maps.Map;
}
declare const Marker: React.FC<MarkerProps>;
export default Marker;
