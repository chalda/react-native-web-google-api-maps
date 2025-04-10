export declare function useMap(): {
    setMap: (map: google.maps.Map) => void;
    animateToRegion: (region: {
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
    }, duration?: number) => void;
    getMap: () => google.maps.Map | null;
};
