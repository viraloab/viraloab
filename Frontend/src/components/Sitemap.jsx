import React, { useEffect } from "react";

const SiteMap = () => {
  useEffect(() => {
    // Set correct content type
    const meta = document.createElement("meta");
    meta.httpEquiv = "Content-Type";
    meta.content = "application/xml; charset=UTF-8";
    document.head.appendChild(meta);

    // Clean up on unmount
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
      {`<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                      http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <url>
    <loc>https://www.viraloab.com/</loc>
    <lastmod>2025-06-29T12:30:44+00:00</lastmod>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>https://www.viraloab.com/sitemap</loc>
    <lastmod>2025-06-29T12:30:44+00:00</lastmod>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://www.viraloab.com/#contact</loc>
    <lastmod>2025-06-29T12:30:44+00:00</lastmod>
    <priority>0.7</priority>
  </url>

</urlset>`}
    </pre>
  );
};

export default SiteMap;
