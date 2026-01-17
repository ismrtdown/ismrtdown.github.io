"use client";
import { useState } from "react";

interface OverlayProps {
  x: number; // 0 to 1000
  y: number; // 0 to 1000
  width: number; // 0 to 1000
  height: number; // 0 to 1000
}

export default function MrtMap() {
  const [loaded, setLoaded] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImageLoad = (event: any) => {
    const { naturalWidth, naturalHeight } = event.target;
    setDimensions({ width: naturalWidth, height: naturalHeight });
    setLoaded(true);
  };

  return (
    <div className="w-screen mx-auto p-4">
      <div className="relative inline-block w-full overflow-hidden rounded-lg shadow-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="MRTMap.jpg"
          alt="mrt map"
          className="w-full h-auto block" // h-auto ensures the image scales proportionally
          onLoad={handleImageLoad}
        />

        {loaded && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 100, 255, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Overlay Content
          </div>
        )}
      </div>
    </div>
  );
}
