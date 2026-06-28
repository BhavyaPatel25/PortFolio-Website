/**
 * Static fallback for the hero 3D field.
 * Kept in its own module (no `three` import) so statically importing it
 * from Hero doesn't drag Three.js into the main bundle. The live WebGL
 * scene lives in `LatentSpace.tsx` and is lazy-loaded.
 */
export function LatentSpaceFallback({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        background:
          'radial-gradient(circle at 50% 45%, rgba(198,242,78,0.16) 0%, rgba(198,242,78,0) 55%), radial-gradient(circle, #17140f 1px, transparent 1px)',
        backgroundSize: 'auto, 32px 32px',
      }}
    />
  );
}

export default LatentSpaceFallback;
