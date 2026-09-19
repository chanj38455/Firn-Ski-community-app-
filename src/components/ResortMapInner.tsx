"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import Link from "next/link";
import { resorts } from "@/data/resorts";
import { Resort } from "@/lib/types";

const goldIcon = (active: boolean) =>
  L.divIcon({
    className: "",
    html: `<div style="
        width:${active ? 22 : 16}px;
        height:${active ? 22 : 16}px;
        border-radius:9999px;
        background:${active ? "#b8935a" : "#0e1420"};
        border:2px solid #faf8f4;
        box-shadow:0 0 0 2px ${active ? "#b8935a" : "#0e1420"};
      "></div>`,
    iconSize: [active ? 22 : 16, active ? 22 : 16],
    iconAnchor: [active ? 11 : 8, active ? 11 : 8],
  });

function FlyTo({ resort }: { resort: Resort | null }) {
  const map = useMap();
  useEffect(() => {
    if (resort) {
      map.flyTo([resort.coordinates.lat, resort.coordinates.lng], 10, {
        duration: 1.1,
      });
    } else {
      map.flyTo([15, 40], 2, { duration: 1.1 });
    }
  }, [resort, map]);
  return null;
}

export default function ResortMapInner({
  selectableList = true,
}: {
  selectableList?: boolean;
}) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const markerRefs = useRef<Record<string, L.Marker | null>>({});
  const selected = resorts.find((r) => r.slug === selectedSlug) ?? null;

  const select = (slug: string) => {
    setSelectedSlug(slug);
    setTimeout(() => markerRefs.current[slug]?.openPopup(), 700);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      {selectableList && (
        <div className="flex gap-3 overflow-x-auto md:w-64 md:flex-col md:overflow-visible">
          <button
            onClick={() => setSelectedSlug(null)}
            className={`shrink-0 rounded-lg border px-4 py-3 text-left text-sm transition ${
              selectedSlug === null
                ? "border-gold bg-gold/10 text-ink"
                : "border-line-light text-ink/60 hover:border-gold"
            }`}
          >
            World view
          </button>
          {resorts.map((r) => (
            <button
              key={r.slug}
              onClick={() => select(r.slug)}
              className={`shrink-0 rounded-lg border px-4 py-3 text-left transition ${
                selectedSlug === r.slug
                  ? "border-gold bg-gold/10"
                  : "border-line-light hover:border-gold"
              }`}
            >
              <div className="font-display text-base text-ink">{r.name}</div>
              <div className="text-xs text-ink/50">{r.country}</div>
            </button>
          ))}
        </div>
      )}

      <div className="h-[420px] w-full overflow-hidden rounded-xl border border-line-light md:h-[520px]">
        <MapContainer
          center={[15, 40]}
          zoom={2}
          scrollWheelZoom
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FlyTo resort={selected} />
          {resorts.map((r) => (
            <Marker
              key={r.slug}
              position={[r.coordinates.lat, r.coordinates.lng]}
              icon={goldIcon(r.slug === selectedSlug)}
              ref={(el) => {
                markerRefs.current[r.slug] = el;
              }}
              eventHandlers={{ click: () => setSelectedSlug(r.slug) }}
            >
              <Popup>
                <div className="min-w-[160px]">
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-xs text-ink/60">{r.region}, {r.country}</p>
                  <Link
                    href={`/resorts/${r.slug}`}
                    className="mt-2 inline-block text-xs font-medium text-gold underline"
                  >
                    View resort →
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
