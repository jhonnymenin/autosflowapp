import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Imagens passam por `@/components/image` (arquivos pré-gerados). Um
  // `next/image` direto voltaria a usar o Image Optimization da Vercel.
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/components/image.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "next/image",
              message:
                "Use `@/components/image`: next/image direto gera /_next/image (Image Optimization da Vercel).",
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
