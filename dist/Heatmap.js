// Heatmap.tsx
import { useEffect } from "react";
const Heatmap = ({ points, radius, opacity, dissipating, gradient, map, }) => {
    useEffect(() => {
        if (!map || !window.google?.maps?.visualization)
            return;
        const heatmap = new google.maps.visualization.HeatmapLayer({
            data: points.map((p) => new google.maps.LatLng(p.latitude, p.longitude)),
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
