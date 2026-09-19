"use client";

import dynamic from "next/dynamic";

const ResortMapInner = dynamic(() => import("./ResortMapInner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] w-full items-center justify-center rounded-xl border border-line-light bg-paper-dim text-sm text-ink/50 md:h-[520px]">
      Loading map…
    </div>
  ),
});

export default function ResortMap(props: { selectableList?: boolean }) {
  return <ResortMapInner {...props} />;
}
