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
        popUp: {
          '0%': { opacity: '0', transform: 'translate(-50%, 4px) scale(0.8)' },
          '100%': { opacity: '1', transform: 'translate(-50%, 0) scale(1)' },
        },
      },
      animation: {
        fly: 'fly 0.6s ease-in-out infinite',
        'pop-up': 'popUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
    },
  },
  plugins: [],
};
