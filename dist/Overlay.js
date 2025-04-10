// Overlay.tsx
import { useEffect } from "react";
const Overlay = ({ image, bounds, opacity = 1, map, }) => {
    useEffect(() => {
        if (!map)
            return;
        const sw = new google.maps.LatLng(bounds[0].latitude, bounds[0].longitude);
        const ne = new google.maps.LatLng(bounds[1].latitude, bounds[1].longitude);
        const overlay = new google.maps.GroundOverlay(image, new google.maps.LatLngBounds(sw, ne), {
            opacity,
        });
        overlay.setMap(map);
        return () => overlay.setMap(null);
    }, [image, bounds, opacity, map]);
    return null;
};
export default Overlay;
