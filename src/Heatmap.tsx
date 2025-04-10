// Heatmap.tsx
import { useEffect } from "react";
import { LatLng } from "./types";

interface HeatmapProps {
    points: LatLng[];
    radius?: number;
    opacity?: number;
    dissipating?: boolean;
    gradient?: string[];
    map?: google.maps.Map | null;
}

const Heatmap: React.FC<HeatmapProps> = ({
    points,
    radius,
    opacity,
    dissipating,
    gradient,
    map,
}) => {
    useEffect(() => {
        if (!map || !window.google?.maps?.visualization) return;

        const heatmap = new google.maps.visualization.HeatmapLayer({
            data: points.map(
                (p) => new google.maps.LatLng(p.latitude, p.longitude),
            ),
            map,
            radius,
            opacity,
            dissipating,
            gradient,
        });

        return () => heatmap.setMap(null);
    }, [map, points, radius, opacity, dissipating, gradient]);

    return null;
};

export default Heatmap;

// useLoadScript({
//     googleMapsApiKey,
//     libraries: ['visualization'],
//   });
