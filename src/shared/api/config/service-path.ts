console.log("=== Все переменные VITE_ ===");
const viteEnv = import.meta.env;
Object.keys(viteEnv)
  .filter((key) => key.startsWith("VITE_"))
  .forEach((key) => {
    console.log(`${key}:`, viteEnv[key]);
  });

export const API_URL = import.meta.env.DEV ? "" : import.meta.env.VITE_BACKEND_URL || "";
console.log("[Config] API_URL =", API_URL);
console.log("[Config] MODE =", import.meta.env.MODE);
console.log("[Config] DEV =", import.meta.env.DEV);
