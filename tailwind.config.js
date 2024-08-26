/** @type {import('tailwindcss').Config} */
import defaultConfig from "@lightdotso/tailwindcss";

// biome-ignore lint/style/noDefaultExport: <explanation>
export default {
  ...defaultConfig,
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
};
