/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F7E7D9",
        beige: "#EFD9C4",
        charcoal: "#1D1D1B",
        gold: "#BB9569",
        terracotta: "#B95D3F",
        walnut: "#4A3427",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["'Inter'", "sans-serif"],
      },
      fontSize: {
        /* Fluid type scale — scales smoothly with viewport width instead of
           jumping at a single breakpoint. clamp(min, preferred, max). */
        "fluid-eyebrow": ["clamp(0.7rem, 0.65rem + 0.2vw, 0.8125rem)", { lineHeight: "1.4" }],
        "fluid-body": ["clamp(0.875rem, 0.83rem + 0.2vw, 1rem)", { lineHeight: "1.7" }],
        "fluid-h4": ["clamp(1.25rem, 1.05rem + 0.9vw, 1.75rem)", { lineHeight: "1.25" }],
        "fluid-h3": ["clamp(1.5rem, 1.2rem + 1.4vw, 2.25rem)", { lineHeight: "1.2" }],
        "fluid-h2": ["clamp(1.875rem, 1.4rem + 2.2vw, 3rem)", { lineHeight: "1.12" }],
        "fluid-h1": ["clamp(2.5rem, 1.6rem + 4.2vw, 5rem)", { lineHeight: "1.05" }],
      },
      letterSpacing: {
        widest2: "0.25em",
      },
      transitionTimingFunction: {
        gallery: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
}

