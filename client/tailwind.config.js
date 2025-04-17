/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // screens: {
    //   sm: '640px', // sm áp dụng cho màn hình >= 640px
    //   md: '768px',
    //   lg: '1024px',
    //   xl: '1280px',
    // },
    extend: {
      fontFamily: {
        salute: ["DFVN Salute", "sans-serif"],
        americana: ["UTM Americana", "serif"],
        insigniaRegular:["SFUInsigniaRegular","sans-serif"]
      },
      colors:{
        primary: '#FFA500',
        secondary: '#D86500',
        light: '#f5deb3',
      },
      spacing: {
        '6.25rem': '6.25rem',
        '11.75rem': '11.75rem',
        '18.75rem': '18.75rem',
      },
      backgroundColor:{
        primary:'#d86500'
      }
    },
  },
  plugins: [],
}

