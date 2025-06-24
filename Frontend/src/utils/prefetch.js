/**
 * Prefetches critical resources for improved performance
 * Helper functions to prefetch images, scripts, fonts, and other resources
 */

/**
 * Prefetch an image by creating a new Image object
 * @param {string} src - URL of the image to prefetch
 * @returns {Promise} - Resolves when the image is loaded or rejects on error
 */
export const prefetchImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error(`Failed to prefetch image: ${src}`));
    img.src = src;
  });
};

/**
 * Prefetch multiple images in parallel
 * @param {Array<string>} sources - Array of image URLs to prefetch
 * @param {number} concurrency - Maximum number of concurrent prefetches
 * @returns {Promise} - Resolves when all images are prefetched
 */
export const prefetchImages = async (sources, concurrency = 3) => {
  const results = {
    loaded: [],
    failed: [],
  };

  // Process images in batches to control concurrency
  for (let i = 0; i < sources.length; i += concurrency) {
    const batch = sources.slice(i, i + concurrency);
    const promises = batch.map((src) =>
      prefetchImage(src)
        .then(() => results.loaded.push(src))
        .catch(() => results.failed.push(src))
    );
    await Promise.allSettled(promises);
  }

  return results;
};

/**
 * Prefetch a resource using <link rel="prefetch">
 * @param {string} url - URL of the resource to prefetch
 * @param {string} as - Resource type (e.g., 'script', 'style', 'font', 'image')
 * @param {string} type - MIME type of the resource
 */
export const prefetchResource = (url, as = "fetch", type = "") => {
  if ("document" in window) {
    const link = document.createElement("link");
    link.rel = "prefetch";
    if (as) link.as = as;
    if (type) link.type = type;
    link.href = url;
    document.head.appendChild(link);
    return link;
  }
  return null;
};

/**
 * Prefetch a JavaScript file
 * @param {string} url - URL of the script to prefetch
 */
export const prefetchScript = (url) => {
  return prefetchResource(url, "script", "application/javascript");
};

/**
 * Prefetch a CSS file
 * @param {string} url - URL of the stylesheet to prefetch
 */
export const prefetchStylesheet = (url) => {
  return prefetchResource(url, "style", "text/css");
};

/**
 * Prefetch a font file
 * @param {string} url - URL of the font to prefetch
 * @param {string} type - Font MIME type (e.g., 'font/woff2')
 */
export const prefetchFont = (url, type = "font/woff2") => {
  return prefetchResource(url, "font", type);
};

/**
 * Preconnect to a domain to start DNS resolution, TCP handshake, and TLS negotiation
 * @param {string} url - Domain URL to preconnect to
 * @param {boolean} crossorigin - Whether the connection will be cross-origin
 */
export const preconnect = (url, crossorigin = true) => {
  if ("document" in window) {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = url;
    if (crossorigin) link.crossOrigin = "anonymous";
    document.head.appendChild(link);
    return link;
  }
  return null;
};

/**
 * Initialize prefetching for critical resources
 * @param {Object} options - Configuration options
 */
export const initPrefetching = (options = {}) => {
  const {
    images = [],
    scripts = [],
    stylesheets = [],
    fonts = [],
    connections = [],
    delay = 2000, // Delay prefetching to not compete with critical resources
  } = options;

  // Use requestIdleCallback or setTimeout to defer non-critical prefetching
  const deferPrefetching = () => {
    // Preconnect to domains first
    connections.forEach((url) => preconnect(url));

    // Then prefetch resources
    if (images.length > 0) prefetchImages(images);
    scripts.forEach((url) => prefetchScript(url));
    stylesheets.forEach((url) => prefetchStylesheet(url));
    fonts.forEach(({ url, type }) => prefetchFont(url, type));
  };

  // Use requestIdleCallback if available, otherwise setTimeout
  if (window.requestIdleCallback) {
    window.requestIdleCallback(() => {
      setTimeout(deferPrefetching, delay);
    });
  } else {
    setTimeout(deferPrefetching, delay);
  }
};
