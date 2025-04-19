export type NormalizedImageInput = string | {
    default: string;
} | {
    uri: string;
    width?: number;
    height?: number;
};
export interface MarkerProps {
    image?: NormalizedImageInput;
}
/**
 * Normalizes a cross-platform `image` value into a string URL usable on the web.
 *
 * Accepts:
 * - Webpack/Vite require(): `string` or `{ default: string }`
 * - Metro/Expo asset: `{ uri: string, width?: number, height?: number }`
 * - Image.resolveAssetSource(): `{ uri: string }`
 *
 * Returns:
 * - The image URI as a string, or undefined if unsupported
 */
export declare function normalizeImage(image: NormalizedImageInput): string | undefined;
