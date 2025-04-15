// normalizeCoordinates.ts

import { LatLng } from "../types";

/**
 * Converts an array of { latitude, longitude } into
 * Google Maps LatLngLiteral format: { lat, lng }
 */
export function normalizeCoordinates(
    coords: LatLng[],
): google.maps.LatLngLiteral[] {
    return coords.map(({ latitude, longitude }) => ({
        lat: latitude,
        lng: longitude,
    }));
}
