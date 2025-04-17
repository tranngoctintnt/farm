/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
    theme: {
    extend: {
      fontFamily: {
        salute: ["DFVN Salute", "sans-serif"],
        americana: ["UTM Americana", "serif"],
        insigniaRegular:["SFUInsigniaRegular","sans-serif"]
      },
      colors:{
        primary:'#D86500'
      },
      backgroundColor:{
        primary:'#D86500'
      }
    },
  },
  plugins: [],
}

