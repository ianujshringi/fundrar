const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./pages/**/*.{js, jsx}", "./components/**/*.{js, jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["Rubik"],
      },
    },
  },
  variants: {
    textColor: ({ after }) => after(["invalid"]),
  },
  plugins: [
    plugin(function ({ addVariant, e }) {
      addVariant("invalid", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`invalid${separator}${className}`)}:invalid`;
        });
      });
    }),
  ],
};
