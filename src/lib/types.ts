export type BookingDraft = {
  pkg: string;
  /** which duration pack of the package — see PackagePack in content/packages */
  pack: string;
  guests: number;
  date: string; // YYYY-MM-DD
  slot: string;
  celebrant: string;
  screenMessage: string;
  /** free choice from the cake flavour list; "" when the pack has no cake */
  cakeFlavour: string;
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
  pack: "",
  guests: 0,
  date: "",
  slot: "",
  celebrant: "",
  screenMessage: "",
  cakeFlavour: "",
  addOns: {},
  coupon: "",
  name: "",
  phone: "",
  email: "",
  notes: "",
};
