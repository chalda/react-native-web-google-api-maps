// normalizeImage.ts
export function normalizeImage(image: any): string | number | undefined {
    if (!image) return undefined;

    if (typeof image === "number") {
        // Native require('...') returns a number
        return image;
    }

    if (typeof image === "string") {
        // Webpack/Vite returns a URL string
        return image;
    }

    if (image?.default && typeof image.default === "string") {
        // ESM-style default export
        return image.default;
    }

    console.warn("normalizeImage: unsupported image type", image);
    return undefined;
}
