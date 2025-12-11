import { useEffect } from "react";

export default function GTM() {
  useEffect(() => {
    // Create dataLayer
    window.dataLayer = window.dataLayer || [];

    // Load GTM script
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://www.googletagmanager.com/gtm.js?id=GTM-WN986WT5";
    document.head.appendChild(script);

    window.dataLayer.push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js",
    });
  }, []);

  return null;
}
