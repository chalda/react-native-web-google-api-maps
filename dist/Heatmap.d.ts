import { LatLng } from "./types";
interface HeatmapProps {
    points: LatLng[];
    radius?: number;
    opacity?: number;
    dissipating?: boolean;
    gradient?: string[];
    map?: google.maps.Map | null;
}
declare const Heatmap: React.FC<HeatmapProps>;
export default Heatmap;
