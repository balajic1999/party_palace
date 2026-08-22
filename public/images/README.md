# Photography drop zone

Every photo slot currently renders generated brand artwork (a lit screen with
seat backs). Nothing looks broken without real photos — but real photos are the
single biggest improvement available to this site.

## How to swap a placeholder for a real photo

1. Drop the file in this folder, e.g. `public/images/birthday-1.jpg`.
2. Add a `src` to the matching entry in `src/content/`:

   ```ts
   // src/content/packages.ts
   image: "/images/birthday-1.jpg",

   // src/content/gallery.ts
   { src: "/images/gallery-1.jpg", alt: "Birthday setup with balloons", seed: "g-birthday-setup" },
   ```

That is the whole change. Keep the `alt` text — it is what screen readers and
search engines use, so make it descriptive.

## What to shoot, and at what size

| Where | Files needed | Aspect | Min width |
|---|---|---|---|
| Hero background | 1 | 16:9, wide | 2400px |
| `packages.ts` → `image` | 3, one per package | 16:9 | 1600px |
| `gallery.ts` | 12 | 4:3 | 1600px |

Export as JPEG, quality ~80, sRGB. Aim for under 400KB each.

### The hero

`src/components/home/hero-media.tsx` holds the hero backdrop. It layers a
looping video (`hero.mp4`) over a still (`hero.jpg`), and the still is what
shows if the video is skipped.

The video is deliberately **not** loaded on phones, for visitors who have asked
for reduced motion, or on data-saver connections — a lot of this venue's
traffic will be on mobile data. Swap either file by replacing it in this folder
and keeping the filename, or edit the two paths in that component.

Keep `hero.mp4` under about 3 MB. If you replace it with a longer or larger
clip, re-encode it down first.

## Shooting notes

The room is dark and the screen is the brightest thing in frame. Expose for the
room, not the screen, or the walls go black. Shoot the decor setups *before*
guests arrive — the site shows rooms as a customer first sees them. A few frames
with people help the package pages feel real, but get written permission before
using anyone's photograph.
