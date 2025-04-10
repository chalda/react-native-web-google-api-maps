import { LatLng } from "./types";
interface OverlayProps {
    image: string;
    bounds: [LatLng, LatLng];
    opacity?: number;
    map?: google.maps.Map | null;
}
declare const Overlay: React.FC<OverlayProps>;
export default Overlay;
