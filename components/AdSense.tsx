import Script from "next/script";

const PUBLISHER_ID = "ca-pub-6698106209794133";

export default function AdSense() {
  return (
    <Script
      id="adsense-script"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}`}
    />
  );
}