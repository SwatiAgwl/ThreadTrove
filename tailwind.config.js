/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        maxContent: "1260px",
      },
      height: {
        '80vh': '80vh',
        '85vh': '85vh',
        '90vh': '90vh',
      }
    }
  },
  plugins: [],
}

