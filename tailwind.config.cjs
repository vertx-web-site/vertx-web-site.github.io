/** @type {import('tailwindcss').Config} */

// TODO replace with with the magic <alpha-value> variable once this issue has
// been resolved: https://github.com/tailwindlabs/tailwindcss/issues/9143
// See https://tailwindcss.com/docs/customizing-colors#using-css-variables for
// more information about the <alpha-value> variable.
// Explanation: 'prose' is a plugin and if we use <alpha-value> in our theme
// colors, prose will not be able to replace <alpha-value> with the correct
// tw-opacity variable.
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgb(var(--${variableName}) / ${opacityValue})`
    }
    return `rgb(var(--${variableName}))`
  }
}

const fallbackFonts = [
  "Roboto",
  "ui-sans-serif",
  "system-ui",
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Helvetica Neue",
  "Arial",
  "Noto Sans",
  "sans-serif",
  "Apple Color Emoji",
  "Segoe UI Emoji",
  "Segoe UI Symbol",
  "Noto Color Emoji",
]

module.exports = {
  darkMode: "class",
  content: [
    "./mdx-components.tsx",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-roboto)", ...fallbackFonts],
      bold: ["var(--font-roboto-bold)", ...fallbackFonts],
      black: ["var(--font-roboto-black)", ...fallbackFonts],
      mono: 'Menlo,var(--font-dejavu),SFMono-Regular,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
    },
    colors: {
      bg: withOpacity("color-bg"),
      "bg-secondary": withOpacity("color-bg-secondary"),
      "bg-ternary": withOpacity("color-bg-ternary"),
      "bg-darkblue": withOpacity("color-bg-darkblue"),
      "bg-code": withOpacity("color-bg-code"),
      "bg-code-highlighted": withOpacity("color-bg-code-highlighted"),
      primary: withOpacity("color-primary"),
      "primary-hover": withOpacity("color-primary-hover"),
      alert: withOpacity("color-alert"),
      text: withOpacity("color-text"),
      code: withOpacity("color-code"),
      "code-container-header": withOpacity("color-code-container-header"),
      black: withOpacity("color-black"),
      white: withOpacity("color-white"),
      "gray-100": withOpacity("color-gray-100"),
      "gray-200": withOpacity("color-gray-200"),
      "gray-300": withOpacity("color-gray-300"),
      "gray-400": withOpacity("color-gray-400"),
      "gray-500": withOpacity("color-gray-500"),
      "gray-600": withOpacity("color-gray-600"),
      "gray-700": withOpacity("color-gray-700"),
      "gray-800": withOpacity("color-gray-800"),
      "gray-900": withOpacity("color-gray-900"),
      "green-500": withOpacity("color-green-500"),
      "inline-code": withOpacity("color-inline-code"),
    },
    screens: {
      xs: "480px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1476px",
    },
    keyframes: {
      fadeIn: {
        "0%": {
          opacity: 0,
        },
        "100%": {
          opacity: 1,
        },
      },
      fadeOut: {
        "0%": {
          opacity: 1,
        },
        "100%": {
          opacity: 0,
        },
      },
      dialogFadeIn: {
        "0%": {
          transform: "scale(0.95)",
          opacity: 0,
        },
        "100%": {
          transform: "scale(1)",
          opacity: 1,
        },
      },
      dialogFadeOut: {
        "0%": {
          transform: "scale(1)",
          opacity: 1,
        },
        "100%": {
          transform: "scale(0.95)",
          opacity: 0,
        },
      },
    },
    extend: {
      animation: {
        "delay-100": "fadeIn 1ms linear 100ms backwards",
        "spin-4s": "spin 4s linear infinite",
        "fade-in": "fadeIn 100ms ease-out",
        "fade-out": "fadeOut 100ms ease-out",
        "dialog-fade-in": "dialogFadeIn 100ms ease-out",
        "dialog-fade-out": "dialogFadeOut 100ms ease-out",
      },
      keyframes: {
        spin: {
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.text"),
            "--tw-prose-headings": theme("colors.gray-800"),
            "--tw-prose-lead": theme("colors.gray-600"),
            "--tw-prose-links": theme("colors.primary"),
            "--tw-prose-bold": theme("colors.text"),
            "--tw-prose-counters": theme("colors.text"),
            "--tw-prose-bullets": theme("colors.text"),
            // "--tw-prose-hr": colors.slate[200],
            // "--tw-prose-quotes": colors.slate[900],
            // "--tw-prose-quote-borders": colors.slate[200],
            // "--tw-prose-captions": colors.slate[500],
            // "--tw-prose-code": colors.slate[900],
            // "--tw-prose-pre-code": colors.slate[200],
            // "--tw-prose-pre-bg": colors.slate[800],
            // "--tw-prose-th-borders": colors.slate[300],
            // "--tw-prose-td-borders": colors.slate[200],
            // "--tw-prose-invert-body": colors.slate[300],
            // "--tw-prose-invert-headings": colors.white,
            // "--tw-prose-invert-lead": colors.slate[400],
            // "--tw-prose-invert-links": colors.white,
            // "--tw-prose-invert-bold": colors.white,
            // "--tw-prose-invert-counters": colors.slate[400],
            // "--tw-prose-invert-bullets": colors.slate[600],
            // "--tw-prose-invert-hr": colors.slate[700],
            // "--tw-prose-invert-quotes": colors.slate[100],
            // "--tw-prose-invert-quote-borders": colors.slate[700],
            // "--tw-prose-invert-captions": colors.slate[400],
            // "--tw-prose-invert-code": colors.white,
            // "--tw-prose-invert-pre-code": colors.slate[300],
            // "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
            // "--tw-prose-invert-th-borders": colors.slate[600],
            // "--tw-prose-invert-td-borders": colors.slate[700],
            lineHeight: null,
            maxWidth: null,
            h1: {
              fontWeight: 400,
              fontSize: "2em",
            },
            h2: {
              fontWeight: 400,
              fontSize: "1.75em",
            },
            h3: {
              fontWeight: 400,
              fontSize: "1.5em",
            },
            h4: {
              fontWeight: 400,
              fontSize: "1.25em",
            },
            h6: {
              fontWeight: 400,
              marginTop: `${theme("spacing.8")}`,
              marginBottom: `${theme("spacing.4")}`,
            },
            "h1 a,h2 a,h3 a,h4 a,h5 a,h1 a:hover,h2 a:hover,h3 a:hover,h4 a:hover,h5 a:hover":
              {
                color: `${theme("colors.gray-800")} !important`,
              },
            "h1 code": {
              color: null,
            },
            "h2 code": {
              color: null,
            },
            "h3 code": {
              color: null,
            },
            "h4 code": {
              color: null,
            },
            ".blog-post h1,.blog-post h2,.blog-post h3,.blog-post h4,.blog-post h5":
              {
                textAlign: "center",
              },
            ".blog-post p": {
              textAlign: "justify",
              hyphens: "auto",
            },
            ".blog-post p code": {
              hyphens: "none",
            },
            ".blog-post dt": {
              fontWeight: "normal",
              marginTop: "1.25em",
            },
            ".blog-post dd": {
              marginLeft: "1.625em",
            },
            ".blog-post dt p": {
              marginTop: "0.625em",
              marginBottom: "0.625em",
            },
            ".blog-post dd p": {
              marginTop: "0.625em",
              marginBottom: "0.625em",
            },
            a: {
              textDecoration: null,
              fontWeight: 300,
              overflowWrap: "break-word",
            },
            "a:hover": {
              textDecoration: "underline",
              color: theme("colors.primary-hover"),
            },
            ul: {
              paddingLeft: "0.85em",
            },
            "ul ul": {
              paddingLeft: "1.625em",
            },
            pre: null,
            code: null,
            "pre code": null,
            "code::before": null,
            "code::after": null,
            strong: {
              fontWeight: 400,
            },
            dt: {
              fontWeight: 400,
            },
            dd: {
              paddingLeft: `${theme("spacing.8")}`,
              marginTop: `${theme("spacing.5")}`,
              marginBottom: `${theme("spacing.5")}`,
            },
            "dd h6": {
              marginTop: `${theme("spacing.5")}`,
              marginBottom: `${theme("spacing.3")}`,
            },
            "dd > h6 + p": {
              marginTop: `${theme("spacing.3")}`,
            },
            th: {
              textAlign: "left",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
