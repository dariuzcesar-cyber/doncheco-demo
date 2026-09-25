import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        tinto: "#800020", // Borgoña gourmet — color de marca
        tintoDark: "#5c0017",
        madera: "#A9762F", // Madera noble / miel
        maderaLight: "#C9A268",
        pizarra: "#211D1C", // Negro pizarra (texto)
        papel: "#FBF6EE", // Crema suave / papel
        papelDark: "#F1E6D2",
        whatsapp: "#25D366",
      },
      fontFamily: {
        sans: ["var(--font-jost)", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      keyframes: {
        pop: {
          "0%": { transform: "scale(0.6)" },
          "60%": { transform: "scale(1.25)" },
          "100%": { transform: "scale(1)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        pop: "pop 0.3s ease-out",
        "fade-up": "fade-up 0.4s ease-out both",
        "slide-in": "slide-in 0.25s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
