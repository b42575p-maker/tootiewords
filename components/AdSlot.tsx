"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[];
  }
}

type AdSlotProps = {
  slot?: string;
  className?: string;
};

export default function AdSlot({
  slot,
  className = "",
}: AdSlotProps) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

  useEffect(() => {
    if (!publisherId || !slot) {
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense may already be processing this slot.
    }
  }, [publisherId, slot]);

  if (!publisherId || !slot) {
    return null;
  }

  return (
    <div className={`ad-slot ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}