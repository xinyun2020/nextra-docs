/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // class based darkMode
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "theme.config.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        plex: ["IBM Plex Mono", "monospace"],
        fira: ["Fira Code", "monospace"],
        eleyang: ["ELEYANG Reading", "cursive"],
      },
      fontStyle: {
        plex: ["italic"],
      },
      keyframes: {
        fly: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-4px) rotate(-5deg)' },
          '75%': { transform: 'translateY(-2px) rotate(3deg)' },
        },
      },
      animation: {
        fly: 'fly 0.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
