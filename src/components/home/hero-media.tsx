"use client";

import { useEffect, useState } from "react";

/**
 * Hero backdrop: a still that always renders, with a looping video layered over
 * it once we know the video is worth loading.
 *
 * The still is never conditional — if the video is skipped or fails, the hero
 * still looks finished. The video is only fetched when all of these hold:
 *   • the viewport is wide enough that it will actually be seen
 *   • the visitor has not asked for reduced motion
 *   • the browser is not reporting a data-saver connection
 *
 * That last pair matter here: a large share of this venue's traffic will be on
 * mobile data in Tirupati, and a 2 MB autoplaying loop is a rude thing to push
 * down that connection.
 */
export function HeroMedia() {
  const [playVideo, setPlayVideo] = useState(false);
  const [ready, setReady] = useState(false);

  // Capability checks are browser-only, so they can only run after mount.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wideEnough = window.matchMedia("(min-width: 768px)").matches;
    const conn = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!reduceMotion && wideEnough && !conn?.saveData) setPlayVideo(true);
  }, []);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {playVideo && (
        <video
          src="/images/hero.mp4"
          poster="/images/hero.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onCanPlay={() => setReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Legibility wash. Two layers: a left-weighted one so the headline always
          has contrast, and an overall darkener for the rest of the frame. */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-plum-900/95 via-plum-900/70 to-plum-900/25"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-plum-900/15" aria-hidden="true" />
    </>
  );
}
