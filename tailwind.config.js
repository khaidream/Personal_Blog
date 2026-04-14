/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  // 不使用 DaisyUI 主题，避免变量冲突
  plugins: [],
}