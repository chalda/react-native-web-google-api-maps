// useMap.ts
import { useRef, useCallback } from "react";
export function useMap() {
    const mapRef = useRef(null);
    const setMap = useCallback((map) => {
        mapRef.current = map;
    }, []);
    const animateToRegion = useCallback((region, duration = 1000) => {
        const map = mapRef.current;
        if (!map)
            return;
        const targetZoom = Math.round(Math.log(360 / region.latitudeDelta) / Math.LN2);
        const center = { lat: region.latitude, lng: region.longitude };
        map.panTo(center);
        map.setZoom(targetZoom); // no animation available, setZoom is instant
    }, []);
    return {
        setMap,
        animateToRegion,
        getMap: () => mapRef.current,
    };
}
// export interface GoogleMapViewProps extends MapViewProps {
//     mapRef?: (map: google.maps.Map | null) => void;
//   }
//   const handleOnLoad = useCallback((map: google.maps.Map) => {
//     mapRef.current = map;
//     mapRefProp?.(map);
//     ...
//   }, [mapRefProp]);
//   const handleOnUnmount = () => {
//     mapRef.current = null;
//     mapRefProp?.(null);
//   };
