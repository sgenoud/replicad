// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "replicad",
  tagline: "The library to build browser based 3D models with code.",
  url: "https://replicad.xyz",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "sgenoud", // Usually your GitHub org/user name.
  projectName: "replicad", // Usually your repo name.

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/sgenoud/replicad/tree/main/packages/replicad-docs",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "replicad",
        logo: {
          alt: "Replicad Logo",
          src: "img/replicad.png",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Documentation",
          },
          { to: "/docs/api/", label: "API", position: "left" },
          {
            href: "https://studio.replicad.xyz/visualiser",
            label: "Visualiser",
          },
          {
            href: "https://github.com/sgenoud/replicad",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Documentation",
                to: "/docs/intro",
              },
              {
                label: "API",
                to: "/docs/api/",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/sgenoud/replicad",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} QuaroTech.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
  plugins: [
    [
      "docusaurus-plugin-typedoc",

      // Plugin / TypeDoc options
      {
        entryPoints: ["../replicad/src/index.ts"],
        tsconfig: "../replicad/tsconfig.json",
        watch: process.env.TYPEDOC_WATCH,
      },
    ],
  ],
};

module.exports = config;
