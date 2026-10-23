import React from 'react';
import imageManifest from '../generated/image-manifest.json';

export { imageManifest };

export default function ResponsiveImage({ imageKey, alt, sizes = '100vw', loading = 'lazy', fetchPriority, className, maxWidth, ...props }) {
  const image = imageManifest[imageKey];
  if (!image) throw new Error(`Missing optimized image: ${imageKey}`);
  const candidates = format => {
    const all = image[format];
    return maxWidth ? all.filter(item => item.width <= maxWidth) : all;
  };
  const webp = candidates('webp');
  const sourceSet = format => candidates(format).map(item => `${item.src} ${item.width}w`).join(', ');
  return <picture style={{ display: 'contents' }}>
    <source type="image/avif" srcSet={sourceSet('avif')} sizes={sizes} />
    <source type="image/webp" srcSet={sourceSet('webp')} sizes={sizes} />
    <img {...props} className={className} src={webp[webp.length - 1]?.src || image.fallback}
      width={image.width} height={image.height} alt={alt} sizes={sizes}
      loading={loading} decoding="async" fetchpriority={fetchPriority} />
  </picture>;
}
