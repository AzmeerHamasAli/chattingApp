/** @type {import('tailwindcss').Config} */
export default {
   content: ["**/*.{html,js,jsx,ts,tsx}"],
   theme: {
      extend: {
         fontFamily: {
            poppins: "Poppins",
         },
         colors: {
            barColor: "#EFEFEF",
            bodyColor: "#f5f5f5",
         },
      },
   },
   plugins: [],
};
