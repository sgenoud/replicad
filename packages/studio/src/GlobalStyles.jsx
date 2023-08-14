import { createGlobalStyle } from "styled-components";

import { normalize } from "polished";

export default createGlobalStyle`
  ${normalize()}

  @font-face {
    font-family: "HKGrotesk";
    font-weight: 500;
    src: url("/fonts/HKGrotesk-Regular.woff2") format("woff2");
   }

  @font-face {
    font-family: "HKGrotesk";
    font-weight: 300;
    src: url("/fonts/HKGrotesk-Light.woff2") format("woff2");
   }

  @font-face {
    font-family: "HKGrotesk";
    font-weight: bold;
    src: url("/fonts/HKGrotesk-Bold.woff2") format("woff2");
   }


  body {
    font-family: HKGrotesk, sans-serif;
    font-weight: 300;
    overflow-x: hidden;
  }

  * {
    box-sizing: border-box;
  }

  html, body {
    box-sizing: border-box;
    background-color: white;
    color: #444;
    fill: #444;
    scroll-behavior: smooth;
  }

    html, body, #root {
        min-height: 100%;
        width: 100%;
        display: flex;
    }

:root {
    --color-primary: rgb(90, 130, 150);
    --color-primary-light: rgb(170, 190, 200);
    --color-primary-dark: rgb(60, 90, 110);
    --color-secondary: #d49991;
    --color-secondary-light: #f2e0de;
    --color-secondary-dark: #c0695d;
    --bg-color: #f2f3f4;
  }

a {
    color: var(--color-primary);
}
`;
