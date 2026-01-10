// src/components/Icons.js
// All icons required by the app

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

export const Plus = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}><path d="M12 5v14m-7-7h14" /></svg>
);

export const User = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const Home = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <path d="M9 22V12h6v10" />
  </svg>
);

export const ListTodo = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}>
    <path d="M3 6h18" />
    <path d="M3 12h18" />
    <path d="M3 18h18" />
  </svg>
);

export const FileText = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

export const Download = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const Trash2 = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6m4-6v6" />
  </svg>
);

export const AlertTriangle = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export const Circle = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}>
    <circle cx="12" cy="12" r="9" />
  </svg>
);

export const CheckCircle2 = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}>
    <path d="M9 12l2 2 4-4" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

export const Clock = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

export const AlarmClock = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}>
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l3 2" />
    <path d="M5 3l4 4M19 3l-4 4" />
  </svg>
);

/* 🔥 FIX FOR CURRENT ERROR */
export const Target = ({ size = 20, className = "" }) => (
  <svg {...icon(size, className)}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);
