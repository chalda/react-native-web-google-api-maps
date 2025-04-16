import { LatLng } from "../types";
/**
 * Converts an array of { latitude, longitude } into
 * Google Maps LatLngLiteral format: { lat, lng }
 */
export declare function normalizeCoordinates(coords: LatLng[]): google.maps.LatLngLiteral[];
