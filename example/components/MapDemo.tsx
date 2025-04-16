import React, { useRef } from "react";
import MapView, { Marker, Callout, Polyline, Circle, Polygon } from "../../src";

export default function MapDemo() {
    const mapRef = useRef<any>(null);

    const coordinates = [
        { latitude: 40.6782, longitude: -73.9442 },
        { latitude: 40.68, longitude: -73.95 },
        { latitude: 40.682, longitude: -73.943 },
    ];

    const polygonCoords = [
        { latitude: 40.679, longitude: -73.947 },
        { latitude: 40.681, longitude: -73.947 },
        { latitude: 40.681, longitude: -73.943 },
        { latitude: 40.679, longitude: -73.943 },
    ];

    return (
        <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            initialRegion={{
                latitude: 40.6782,
                longitude: -73.9442,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
        >
            <Marker coordinate={coordinates[0]} map={mapRef.current}>
                <Callout>
                    <div style={{ padding: 6 }}>
                        <strong>📍 Brooklyn</strong>
                        <p>This is a custom JSX callout.</p>
                    </div>
                </Callout>
            </Marker>

            <Polyline
                coordinates={coordinates}
                strokeColor="red"
                strokeWidth={2}
                lineDashPattern={[8, 10]}
            />

            <Circle
                center={coordinates[1]}
                radius={100}
                strokeColor="#007AFF"
                fillColor="rgba(0,122,255,0.2)"
            />

            <Polygon
                coordinates={polygonCoords}
                strokeColor="green"
                fillColor="rgba(0,255,0,0.2)"
            />
        </MapView>
    );
}
