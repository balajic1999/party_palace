export type BookingDraft = {
  pkg: string;
  guests: number;
  date: string; // YYYY-MM-DD
  slot: string;
  celebrant: string;
  screenMessage: string;
  addOns: Record<string, number>;
  coupon: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

export type Booking = BookingDraft & {
  ref: string;
  createdAt: string;
  amountPaid: number;
  balanceDue: number;
  total: number;
};

export const emptyDraft: BookingDraft = {
  pkg: "",
  guests: 0,
  date: "",
  slot: "",
  celebrant: "",
  screenMessage: "",
  addOns: {},
  coupon: "",
  name: "",
  phone: "",
  email: "",
  notes: "",
};
