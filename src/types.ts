// types.ts

export type LatLng = {
    latitude: number;
    longitude: number;
};

export type Region = LatLng & {
    latitudeDelta: number;
    longitudeDelta: number;
};

export type EdgePadding = {
    top: number;
    right: number;
    bottom: number;
    left: number;
};
export type MapViewProps = {
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
    onPress?: (event: { coordinate: LatLng }) => void;
    onLongPress?: (event: { coordinate: LatLng }) => void;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    minZoomLevel?: number;
    maxZoomLevel?: number;
    customMapStyle?: any[];
    googleMapsApiKey: string;
};
