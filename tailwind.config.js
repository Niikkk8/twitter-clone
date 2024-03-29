/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "twitter-color": "#1da1f2",
        "twitter-background": "#e6ecf0",
        "twitter-black": "#14171a",
        "twitter-dark-gray": "#657786",
        "twitter-light-gray": "#aab8c2",
        "twitter-extra-light-gray": "#e1e8ed",
        "twitter-white": "#f5f8fa",
      },
    },
  },
  plugins: [],
}

