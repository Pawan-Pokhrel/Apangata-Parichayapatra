import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	optimizeDeps: {},
	server: {
		port: 5173, // Optional: Customize your dev server port
	},
});
