# Chim Lạc — reusable guided mascot

The entire mascot feature is isolated in this directory. No code here depends on the demo dashboard.

## Quick integration

1. Copy `src/components/chim-lac/` into your Next.js or React app.
2. Install `lucide-react` if it is not already installed.
3. Import the component and provide the CSS selectors of your own existing UI elements.

```tsx
"use client";

import { useRef } from "react";
import { MascotGuide, type MascotGuideHandle, type MascotStep } from "@/components/chim-lac";

const steps: MascotStep[] = [
  { target: "#begin-lesson", title: "Bắt đầu nhé!", description: "Bấm nút này để học." },
  { target: "#course-list", title: "Các khóa học", description: "Hãy chọn một khóa học." },
];

export function MyPage() {
  const mascot = useRef<MascotGuideHandle>(null);
  return (
    <>
      <button onClick={() => mascot.current?.startTour()}>Xem hướng dẫn</button>
      <button id="begin-lesson">Bắt đầu học</button>
      <div id="course-list">...</div>
      <MascotGuide ref={mascot} steps={steps} storageKey="my-site:tour-v1" />
    </>
  );
}
```

## Imperative API

`startTour()`, `showStep(index)`, `dock()`, `show()`, `hide()`, `resetProgress()`.

## Art

The bundled `ChimLacArt.tsx` is an independently animated SVG illustration inspired by the user's Chim Lạc reference. This is **not** a vectorization of the original 3D image. To use the exact original art, export it as transparent WebP/PNG in your own app and pass `imageSrc="/path/to/chim-lac.webp"`. Flight and idle movement still work; independently flapping 3D wings require layered artwork.

The CSS handles floating/flight between UI elements. Each host defines the selectors and copy. No AI backend is required.

## Interaction and accessibility

- Mascot never blocks clicks on the underlying content except its own controls/card.
- The current target receives a non-interactive gold focus ring.
- Scrolling/resizing recalculates positions.
- `prefers-reduced-motion` disables animations/transitions.
- Users can skip/close the tour; completion is optionally stored in localStorage.
- Avoid triggering the tour in the middle of a quiz or writing interaction.
