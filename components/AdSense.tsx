import Script from "next/script";

export default function AdSense() {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

  if (!publisherId) {
    return null;
  }

  return (
    <Script
      id="adsense-script"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
    />
  );
}