// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       // Your pages/components in the app directory
    "./components/**/*.{js,ts,jsx,tsx}", // Reusable UI components
    "./src/**/*.{js,ts,jsx,tsx}",        // If you use /src for additional code
  ],
  darkMode: "class", // Not "media"
  corePlugins: { preflight: true },
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};
