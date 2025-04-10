import React, { useCallback, useEffect, useRef } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
const containerStyle = {
    width: "100%",
    height: "100%",
};
export const GoogleMapView = ({ region, initialRegion, mapType = "standard", showsTraffic = false, zoomControlEnabled = true, showsCompass = true, onRegionChange, onRegionChangeComplete, onPress, onLongPress, style, minZoomLevel = 0, maxZoomLevel = 20, customMapStyle, children, googleMapsApiKey, }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey,
    });
    const mapRef = useRef(null);
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
        if (showsTraffic) {
            const trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap(map);
        }
        if (customMapStyle) {
            map.setOptions({ styles: customMapStyle });
        }
    }, [showsTraffic, customMapStyle]);
    const center = region || initialRegion;
    useEffect(() => {
        if (mapRef.current && region) {
            const googleCenter = new google.maps.LatLng(region.latitude, region.longitude);
            mapRef.current.panTo(googleCenter);
            mapRef.current.setZoom(calculateZoomLevel(region.latitudeDelta));
        }
    }, [region]);
    const handleBoundsChanged = () => {
        if (!mapRef.current)
            return;
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
        if (!mapRef.current)
            return;
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
    const handleClick = (e) => {
        if (e.latLng && onPress) {
            onPress({
                coordinate: {
                    latitude: e.latLng.lat(),
                    longitude: e.latLng.lng(),
                },
            });
        }
    };
    const handleRightClick = (e) => {
        if (e.latLng && onLongPress) {
            onLongPress({
                coordinate: {
                    latitude: e.latLng.lat(),
                    longitude: e.latLng.lng(),
                },
            });
        }
    };
    const calculateZoomLevel = (latitudeDelta) => {
        return Math.round(Math.log(360 / latitudeDelta) / Math.LN2);
    };
    if (!isLoaded || !center)
        return <div>Loading map...</div>;
    return (<div style={{ ...containerStyle, ...style }}>
            <GoogleMap center={{ lat: center.latitude, lng: center.longitude }} zoom={calculateZoomLevel(center.latitudeDelta || 0.1)} onLoad={onMapLoad} onUnmount={(map) => {
            if (mapRef.current === map)
                mapRef.current = null;
        }} onDrag={handleBoundsChanged} onDragEnd={handleDragEnd} onClick={handleClick} onRightClick={handleRightClick} mapContainerStyle={containerStyle} options={{
            mapTypeId: mapType === "standard" ? "roadmap" : mapType,
            disableDefaultUI: !showsCompass,
            zoomControl: zoomControlEnabled,
            minZoom: minZoomLevel,
            maxZoom: maxZoomLevel,
            styles: customMapStyle,
        }}>
                {children}
            </GoogleMap>
        </div>);
};
export default GoogleMapView;
