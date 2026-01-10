// src/components/Icons.js
// Permanent full icon set for Personal Manager App

const icon = (size, className) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className,
});

/* BASIC */
export const Plus = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}><path d="M12 5v14m-7-7h14" /></svg>
);

export const X = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);

export const Save = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/></svg>
);

export const Edit2 = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}><path d="M17 3a2.8 2.8 0 1 1 4 4L7 21l-4 1 1-4L17 3z"/></svg>
);

/* USER / SETTINGS */
export const User = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

export const Settings = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82A1.65 1.65 0 0 0 3.09 13H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 8a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.59 0 1.11.34 1.35.85.24.5.24 1.1 0 1.6-.24.5-.76.85-1.35.85z"/></svg>
);

export const LogOut = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
);

/* THEME */
export const Sun = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/></svg>
);

export const Moon = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
);

/* TASKS */
export const ListTodo = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}><path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/></svg>
);

export const Circle = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}><circle cx="12" cy="12" r="9"/></svg>
);

export const CheckCircle2 = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
);

export const Clock = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
);

export const AlarmClock = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}><circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2"/><path d="M5 3l4 4M19 3l-4 4"/></svg>
);

/* GOALS / HABITS */
export const Target = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
);

export const Zap = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);

export const RefreshCw = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.13-3.36L23 10"/><path d="M20.49 15a9 9 0 0 1-14.13 3.36L1 14"/></svg>
);

/* NOTES */
export const StickyNote = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}><path d="M21 15V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10z"/><polyline points="16 15 21 15 21 20"/></svg>
);

/* FILES */
export const FileText = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
);

export const Download = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
);

/* MONEY */
export const IndianRupee = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}><path d="M6 3h12"/><path d="M6 8h12"/><path d="M6 13h6a6 6 0 0 0 0-12"/><line x1="6" y1="13" x2="18" y2="21"/></svg>
);

/* DELETE / ALERT */
export const Trash2 = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
);
