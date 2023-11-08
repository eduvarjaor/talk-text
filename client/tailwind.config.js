/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,vue}"],
    theme: {
        extend: {
            screens: {
                xm: "400px",
                xx: "200px",
            },
        },
    },
    plugins: [],
};
