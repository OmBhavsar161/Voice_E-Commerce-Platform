/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      
      fontFamily: {
        sriracha: ["Sriracha", "cursive"], // Add Sriracha as a custom font family
      },
      screens: {
        sm: "620px", // Small screens and up "620"
        md: "768px", // Medium screens and up
        lg: "1024px", // Large screens and up
        xl: "1280px", // Extra-large screens and up
        "2xl": "1536px", // 2X extra-large screens and up
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "base-100": "#ffffff", // Forces background color to white
        },
      },
    ],
  },
};
