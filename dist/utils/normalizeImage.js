/// normalizeImage.ts
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
export function normalizeImage(image) {
    if (!image)
        return undefined;
    // Case 1: direct string (e.g., imported static URL)
    if (typeof image === "string")
        return image;
    // Case 2: Webpack/Vite-style require() default export
    if ("default" in image && typeof image.default === "string") {
        return image.default;
    }
    // Case 3: Metro/Expo or Image.resolveAssetSource() result
    if ("uri" in image && typeof image.uri === "string") {
        return image.uri;
    }
    console.warn("normalizeImage: unsupported image type", image);
    return undefined;
}
