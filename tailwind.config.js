/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#334eff",
        laight:"#f5f7fa"
      },
      borderRadius: {
        primary: "20px",
      },
      fontSize: {
        primario: "15px",
        grande: "18px",
      },
      fontFamily: {
        "primary-family": "Outfit",
      },
      backgroundImage: {
        'choquequirao': "url('/img/banners/rainbow-mountain.jpg')",
        'inca-trail': "url('/img/inca-trail.jpg')",
        'machu-picchu': "url('/img/mapi.jpg')",
        'cosmo': "url('/img/banners/cosmo.jpg')",
        'celular': "url('/img/banners/explore-cusco.webp)",
      },
      backdropBlur:{
        'drop': "5px",
      },
      backgroundColor:{
        'transp': "rgba(0, 0, 0, .2);",
      },
      height:{
        'mitad': "55vh",
        'one': "2px"
      },
      width:{
        'fulaso': "350px",
      }
    },
  },
  plugins: [],
};
