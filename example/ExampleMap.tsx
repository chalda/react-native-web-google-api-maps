// TestMap.tsx
import React from "react";
import MapView, { Polyline, Marker, Circle } from "../src";

const TestMap = () => {
    return (
        <div style={{ width: "100%", height: "500px" }}>
            <MapView
                googleMapsApiKey="YOUR_API_KEY"
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={(e) => console.log("Pressed at:", e.coordinate)}
                showsTraffic
                mapType="terrain"
            >
                <Marker
                    coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                    title="Hello"
                />
                <Polyline
                    coordinates={[
                        { latitude: 37.78825, longitude: -122.4324 },
                        { latitude: 37.75825, longitude: -122.4624 },
                    ]}
                    options={{ strokeColor: "#FF0000", strokeWeight: 2 }}
                />
                <Circle
                    center={{ latitude: 37.78825, longitude: -122.4324 }}
                    radius={500}
                    options={{
                        fillColor: "#00F",
                        fillOpacity: 0.2,
                        strokeWeight: 1,
                    }}
                />
            </MapView>
        </div>
    );
};

// Mock components for compatibility
// const Marker = (props: any) => null;
// const Polyline = (props: any) => null;
// const Circle = (props: any) => null;

export default TestMap;
