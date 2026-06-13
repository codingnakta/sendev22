export function ReelIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="1" y="2.5" width="2.5" height="9" rx="1.25" fill="currentColor" fillOpacity="0.6"/>
      <rect x="5.75" y="1" width="2.5" height="12" rx="1.25" fill="currentColor"/>
      <rect x="10.5" y="2.5" width="2.5" height="9" rx="1.25" fill="currentColor" fillOpacity="0.6"/>
    </svg>
  );
}

export function PeopleIcon() {
  return (
    <svg width="60" height="52" viewBox="0 0 60 52" fill="none" aria-hidden="true">
      <circle cx="21" cy="15" r="9" fill="currentColor" opacity="0.35"/>
      <path d="M3 48c0-9.9 8.1-18 18-18s18 8.1 18 18" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" opacity="0.35"/>
      <circle cx="39" cy="13" r="9" fill="currentColor"/>
      <path d="M21 48c0-9.9 8.1-18 18-18s18 8.1 18 18" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
    </svg>
  );
}

export function PersonIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="4.5" r="2.75" stroke="currentColor" strokeWidth="1.25"/>
      <path d="M1.5 12c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
    </svg>
  );
}

export function ShuffleIcon({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M32 8h8v8M40 8 26 22M32 40h8v-8M40 40 26 26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 16h6a8 8 0 0 1 6.5 3.5M8 32h6a8 8 0 0 0 6.5-3.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

export function XIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4.5 4.5 11.5 11.5M11.5 4.5 4.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
