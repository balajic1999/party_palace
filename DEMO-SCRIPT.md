# Client demo — a three-minute run

## Before they arrive

1. `npm run dev`, open `http://localhost:3000`, full-screen the browser.
2. In `src/lib/demo.ts` set `showFailureToggle: false` — hides the
   "simulate a failed payment" checkbox so the payment screen looks final.
3. Clear site data once (DevTools → Application → Clear storage) so
   **My Bookings** starts empty and fills up during the demo.
4. Have a phone on the same Wi-Fi — the terminal prints a Network URL. Showing
   the mobile layout on a real phone lands better than resizing the browser.

---

## The run

### 1 · The homepage (~60s)

Start at the top and scroll slowly. It is one page, and the nav highlights each
section as you pass it — worth pointing out, because it means there are no
extra pages for them to maintain.

Call out, in order:

- **Hero** — three CTAs: Book, WhatsApp, and a tap-to-call number.
- **Our Experiences** — four entry points; each one drops into the matching
  package.
- **Popular Packages** — price up front, features listed, two buttons.
- **Gallery**, **Why Choose Us**, **Reviews**, **FAQ** — the trust-building run.
- **Footer** — address, phone, email, hours, live map, socials.

### 2 · A package (~30s)

Click **View Details** on the Birthday Package. Full inclusions list, optional
extras with prices, and the other two packages underneath.

### 3 · The booking flow (~80s) — this is the demo

Hit **Book this package**.

- **Step 1** — pick a package, set guests. The total on the right reacts live.
- **Step 2** — the calendar. Green dot = slots open, amber = almost full,
  sold-out days are unclickable.
- **Step 3** — *slow down here.* Type a name and a screen message; **the preview
  beside it updates as you type**. That is what is on the theatre screen when
  the guest walks in. Then tick a couple of extras and watch the total move.
- **Step 4** — name and number. Enter **`PALACE10`** and apply it; the discount
  appears in the breakdown.

Then **Pay ₹750 advance**.

### 4 · Payment and ticket (~30s)

The review screen shows every choice with a **Change** link back to that exact
step. Press pay — two seconds of processing — and the ticket appears with its
booking reference and the paid-versus-balance split.

Show **Send to your group** (opens WhatsApp pre-filled) and **Add to calendar**
(downloads a real `.ics`).

### 5 · My Bookings (~15s)

Type the same number and the booking they just made is listed, with the balance
still owing.

---

## Answers to the questions they will ask

**"Is this live? Can customers book right now?"**
No. The front end is complete and the booking flow is real, but there is no
server behind it and no payment gateway — the ₹750 step is simulated. Bookings
are saved in the browser, which is why My Bookings works during this demo.

**"How long to make it real?"**
Three files are written as the seams: availability, storage and pricing. Point
at the table in the README. The UI does not change.

**"Are these our real prices?"**
No — and this is the moment to get the real ones. Only the address and phone
number are confirmed. Every price, capacity, slot time and the opening hours
came from the design brief. They all live in one folder.

**"Can we change wording / add a package / change a price?"**
Yes — `src/content/`, one folder, plain text files.

**"Where are our photos?"**
Not shot yet. Every photo slot renders generated artwork rather than a grey box,
so nothing looks unfinished. `public/images/README.md` lists exactly what to
shoot and at what size — that is the main thing holding the site back.

---

## Do not

- Do not resize the browser mid-demo to show mobile — open it on a real phone.
- Do not rush step 3. The screen-message preview and the live total are the two
  moments worth pausing on.
- Do not promise a launch date in the room.
