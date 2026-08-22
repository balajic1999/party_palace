/**
 * Demo-only switches for this front-end build.
 *
 * There is no payment gateway wired up. `/book/confirm` simulates the advance
 * payment so the flow can be walked end to end. Set `showFailureToggle` to
 * false before a client presentation to hide the "simulate a failure" control.
 */
export const DEMO = {
  showFailureToggle: true,
  processingMs: 2100,
} as const;
