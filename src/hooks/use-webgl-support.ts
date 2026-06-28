import { useEffect, useState } from 'react';

/**
 * Detects whether the browser can actually create a WebGL context.
 * Returns `null` until the check has run on the client, then `true`/`false`.
 * Callers should only mount the WebGL scene when this is exactly `true`,
 * so no-WebGL clients never download the Three.js chunk.
 */
export function useWebGLSupport(): boolean | null {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
      setSupported(!!gl);
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}
