import React from "react";
type LatLng = {
    latitude: number;
    longitude: number;
};
type Region = LatLng & {
    latitudeDelta: number;
    longitudeDelta: number;
};
type MapViewProps = {
    region?: Region;
    initialRegion?: Region;
    mapType?: "standard" | "satellite" | "hybrid" | "terrain";
    showsUserLocation?: boolean;
    showsMyLocationButton?: boolean;
    showsCompass?: boolean;
    showsTraffic?: boolean;
    zoomControlEnabled?: boolean;
    onRegionChange?: (region: Region) => void;
    onRegionChangeComplete?: (region: Region) => void;
    onPress?: (event: {
        coordinate: LatLng;
    }) => void;
    onLongPress?: (event: {
        coordinate: LatLng;
    }) => void;
    style?: React.CSSProperties;
    minZoomLevel?: number;
    maxZoomLevel?: number;
    customMapStyle?: any[];
    children?: React.ReactNode;
    googleMapsApiKey: string;
};
export declare const GoogleMapView: React.FC<MapViewProps>;
export default GoogleMapView;
