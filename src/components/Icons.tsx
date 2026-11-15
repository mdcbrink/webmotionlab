/** Eenvoudige lijniconen (inline SVG, geen extra library). */
type P = { className?: string };
const base = "h-6 w-6";
const S = (props: P & { children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={props.className ?? base}>
    {props.children}
  </svg>
);

export const IconCube = (p: P) => (<S {...p}><path d="M12 2.8 20 7.4v9.2L12 21.2 4 16.6V7.4L12 2.8Z" /><path d="M4 7.4 12 12l8-4.6M12 12v9.2" /></S>);
export const IconBrowser = (p: P) => (<S {...p}><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M3 8.5h18M6.5 6.3h.01M9 6.3h.01" /><path d="M7 13h6M7 16h4" /></S>);
export const IconSpark = (p: P) => (<S {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" /></S>);
export const IconGem = (p: P) => (<S {...p}><path d="M6 3h12l3 5-9 13L3 8l3-5Z" /><path d="M3 8h18M9 3l3 5 3-5M12 8v13" /></S>);
export const IconTag = (p: P) => (<S {...p}><path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Z" /><circle cx="7.5" cy="7.5" r="1.5" /></S>);
export const IconChat = (p: P) => (<S {...p}><path d="M4 5h16v11H9l-5 4V5Z" /><path d="M8 10h8M8 13h5" /></S>);
export const IconChip = (p: P) => (<S {...p}><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /><rect x="9.5" y="9.5" width="5" height="5" rx="1" /></S>);
export const IconCheck = (p: P) => (<S {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></S>);
export const IconClose = (p: P) => (<S {...p}><path d="M6 6l12 12M18 6 6 18" /></S>);
export const IconArrow = (p: P) => (<S {...p}><path d="M5 12h14M13 6l6 6-6 6" /></S>);
export const IconMail = (p: P) => (<S {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6 8.5 7 8.5-7" /></S>);
export const IconPhone = (p: P) => (<S {...p}><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" /></S>);
