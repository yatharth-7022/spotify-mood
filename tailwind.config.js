/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["DM Sans", "sans-serif"],
      },
      backgroundImage: {
        "custom-gradient": `linear-gradient(180deg, rgba(34,34,34,1) 0%, rgba(31,31,31,1) 12%, rgba(23,23,23,1) 26%, rgba(22,22,22,1) 33%, rgba(21,21,21,1) 36%, rgba(19,19,19,1) 45%, rgba(18,18,18,1) 55%, rgba(18,18,18,1) 75%, rgba(18,18,18,1) 85%, rgba(18,18,18,1) 100%);`,
      },
      colors: {
        navbar: "#000000",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
