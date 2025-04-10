import React, { useCallback, useEffect, useRef } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

type LatLng = {
    latitude: number;
    longitude: number;
};

type Region = LatLng & {
    latitudeDelta: number;
    longitudeDelta: number;
};

type EdgePadding = {
    top: number;
    right: number;
    bottom: number;
    left: number;
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
    onPress?: (event: { coordinate: LatLng }) => void;
    onLongPress?: (event: { coordinate: LatLng }) => void;
    style?: React.CSSProperties;
    minZoomLevel?: number;
    maxZoomLevel?: number;
    customMapStyle?: any[];
    children?: React.ReactNode;
    googleMapsApiKey: string;
};

const containerStyle = {
    width: "100%",
    height: "100%",
};

export const GoogleMapView: React.FC<MapViewProps> = ({
    region,
    initialRegion,
    mapType = "standard",
    showsTraffic = false,
    zoomControlEnabled = true,
    showsCompass = true,
    onRegionChange,
    onRegionChangeComplete,
    onPress,
    onLongPress,
    style,
    minZoomLevel = 0,
    maxZoomLevel = 20,
    customMapStyle,
    children,
    googleMapsApiKey,
}) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey,
    });

    const mapRef = useRef<google.maps.Map | null>(null);

    const onMapLoad = useCallback(
        (map: google.maps.Map) => {
            mapRef.current = map;

            if (showsTraffic) {
                const trafficLayer = new google.maps.TrafficLayer();
                trafficLayer.setMap(map);
            }

            if (customMapStyle) {
                map.setOptions({ styles: customMapStyle });
            }
        },
        [showsTraffic, customMapStyle],
    );

    const center = region || initialRegion;

    useEffect(() => {
        if (mapRef.current && region) {
            const googleCenter = new google.maps.LatLng(
                region.latitude,
                region.longitude,
            );
            mapRef.current.panTo(googleCenter);
            mapRef.current.setZoom(calculateZoomLevel(region.latitudeDelta));
        }
    }, [region]);

    const handleBoundsChanged = () => {
        if (!mapRef.current) return;
        const center = mapRef.current.getCenter();
        const bounds = mapRef.current.getBounds();
        if (center && bounds && onRegionChange) {
            const newRegion = {
                latitude: center.lat(),
                longitude: center.lng(),
                latitudeDelta: bounds.toSpan().lat(),
                longitudeDelta: bounds.toSpan().lng(),
            };
            onRegionChange(newRegion);
        }
    };

    const handleDragEnd = () => {
        if (!mapRef.current) return;
        const center = mapRef.current.getCenter();
        const bounds = mapRef.current.getBounds();
        if (center && bounds && onRegionChangeComplete) {
            const newRegion = {
                latitude: center.lat(),
                longitude: center.lng(),
                latitudeDelta: bounds.toSpan().lat(),
                longitudeDelta: bounds.toSpan().lng(),
            };
            onRegionChangeComplete(newRegion);
        }
    };

    const handleClick = (e: google.maps.MapMouseEvent) => {
        if (e.latLng && onPress) {
            onPress({
                coordinate: {
                    latitude: e.latLng.lat(),
                    longitude: e.latLng.lng(),
                },
            });
        }
    };

    const handleRightClick = (e: google.maps.MapMouseEvent) => {
        if (e.latLng && onLongPress) {
            onLongPress({
                coordinate: {
                    latitude: e.latLng.lat(),
                    longitude: e.latLng.lng(),
                },
            });
        }
    };

    const calculateZoomLevel = (latitudeDelta: number) => {
        return Math.round(Math.log(360 / latitudeDelta) / Math.LN2);
    };

    if (!isLoaded || !center) return <div>Loading map...</div>;

    return (
        <div style={{ ...containerStyle, ...style }}>
            <GoogleMap
                center={{ lat: center.latitude, lng: center.longitude }}
                zoom={calculateZoomLevel(center.latitudeDelta || 0.1)}
                onLoad={onMapLoad}
                onUnmount={(map) => {
                    if (mapRef.current === map) mapRef.current = null;
                  }}                onDrag={handleBoundsChanged}
                onDragEnd={handleDragEnd}
                onClick={handleClick}
                onRightClick={handleRightClick}
                mapContainerStyle={containerStyle}
                options={{
                    mapTypeId: mapType === "standard" ? "roadmap" : mapType,
                    disableDefaultUI: !showsCompass,
                    zoomControl: zoomControlEnabled,
                    minZoom: minZoomLevel,
                    maxZoom: maxZoomLevel,
                    styles: customMapStyle,
                }}
            >
                {children}
            </GoogleMap>
        </div>
    );
};


export default GoogleMapView;
