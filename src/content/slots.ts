export type Slot = {
  id: string;
  label: string;
  start: string; // 24h "HH:MM"
  end: string;
  surcharge: number;
  note?: string;
};

/** Four slots a day, all inside the 10:00 AM – 10:00 PM opening hours. */
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
];

export const slotById = (id: string) => slots.find((s) => s.id === id);
