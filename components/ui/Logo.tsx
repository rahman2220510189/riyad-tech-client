// import { cn } from "@/lib/cn";

// /**
//  * The RT monogram, flat and single-colour.
//  *
//  * Drawn on a modular grid with one stroke weight throughout, so it holds at
//  * 20px in the nav and at 512px on a social card. It inherits currentColor —
//  * ink on paper, paper on the dark footer, no second file.
//  *
//  * The crossbar of the T overshoots its stem on the right, the same way the
//  * marker stroke overshoots the word it highlights. It is the only liberty the
//  * mark takes, and it is the one thing that makes it ours rather than a default
//  * monogram.
//  */
// export function Logo({ className }: { className?: string }) {
//   return (
//     <svg
//       viewBox="0 0 38 32"
//       fill="currentColor"
//       aria-hidden="true"
//       focusable="false"
//       className={cn("h-[1.15em] w-auto", className)}
//     >
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M3 6 H16 V17 H7.5 V26 H3 Z M7.5 10.5 H11.5 V12.5 H7.5 Z"
//       />
//       <path d="M11.5 17 H16 L20.5 26 H16 Z" />
//       <path d="M21.5 6 H35 V10.5 H21.5 Z" />
//       <path d="M26 6 H30.5 V26 H26 Z" />
//     </svg>
//   );
// }