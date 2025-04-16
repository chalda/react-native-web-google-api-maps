// normalizeCoordinates.ts
/**
 * Converts an array of { latitude, longitude } into
 * Google Maps LatLngLiteral format: { lat, lng }
 */
export function normalizeCoordinates(coords) {
    return coords.map(({ latitude, longitude }) => ({
        lat: latitude,
        lng: longitude,
    }));
}
