export type Slot = {
  id: string;
  label: string;
  start: string; // 24h "HH:MM"
  end: string;
  surcharge: number;
  note?: string;
};

/**
 * The day's slots. The first four sit inside the 10:00 AM – 10:00 PM opening
 * hours; the midnight slot runs past them and carries the ₹2,000 surcharge
 * printed on the rules card.
 */
export const slots: Slot[] = [
  { id: "morning", label: "Morning", start: "10:00", end: "12:30", surcharge: 0 },
  { id: "afternoon", label: "Afternoon", start: "13:00", end: "15:30", surcharge: 0 },
  { id: "evening", label: "Evening", start: "16:00", end: "18:30", surcharge: 0 },
  {
    id: "night",
    label: "Night",
    start: "19:00",
    end: "21:30",
    surcharge: 0,
    note: "Most requested",
  },
  {
    id: "midnight",
    label: "Midnight",
    start: "22:30",
    end: "00:30",
    surcharge: 2000,
    note: "Extra ₹2,000",
  },
];

export const slotById = (id: string) => slots.find((s) => s.id === id);
