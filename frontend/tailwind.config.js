/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react';

export const content = [
    './src/**/*.{html,js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
];
export const theme = {
    extend: {
        fontFamily: {
            poppins: ['Poppins', 'sans-serif'],
        },
    },
};

export const darkMode = 'class';
export const plugins = [
    nextui({
        themes: {
            light: {
                colors: {
                    background: '#fff7e9', // or DEFAULT
                    content1: '#ffFFFF',
                    content2: '#ffd8c2',
                    content3: '#ffccaf',
                    content4: '#ffc1a3',
                    // ... rest of the colors
                    default: {
                        50: '#ffffff',
                        100: '#fff1e6',
                        200: '#ffe3cc',
                        300: '#ffd4b3',
                        400: '#ffc699',
                        500: '#ffb780',
                        600: '#ffa866',
                        700: '#ff994d',
                        800: '#ff8a33',
                        900: '#ff7b1a',
                        DEFAULT: '#ff994d',
                        foreground: '#262626',
                    },

                    secondary: {
                        50: '#e1f7e4',
                        100: '#c4f0c9',
                        200: '#a3e7ad',
                        300: '#81dd92',
                        400: '#5fd477',
                        500: '#3dca5c',
                        600: '#2eb349',
                        700: '#239d3a',
                        800: '#18872c',
                        900: '#0d701e',
                        DEFAULT: '#5fd477',
                    },
                    success: {
                        50: '#e1f7f0',
                        100: '#c4f0e0',
                        200: '#a3e7d1',
                        300: '#81ddc1',
                        400: '#5fd4b2',
                        500: '#3dca9f',
                        600: '#2eb38b',
                        700: '#239d76',
                        800: '#188760',
                        900: '#0d704a',
                        DEFAULT: '#5fd4b2',
                    },
                    warning: {
                        50: '#fff4e1',
                        100: '#ffe8c4',
                        200: '#ffdb9f',
                        300: '#ffcd7a',
                        400: '#ffbf56',
                        500: '#ffb233',
                        600: '#e6992b',
                        700: '#cc8223',
                        800: '#b36a1b',
                        900: '#994e13',
                        DEFAULT: '#ffb233',
                    },
                },
            },
            mytheme: {
                colors: {
                    background: {
                        DEFAULT: '#fff7e9',
                        foreground: '#4a4a4a',
                    },
                    danger: {
                        50: '#ffeded',
                        100: '#ffdad7',
                        200: '#ffb3af',
                        300: '#ff8d87',
                        400: '#ff665e',
                        500: '#ff4035',
                        600: '#e63930',
                        700: '#cc332b',
                        800: '#b32c26',
                        900: '#992620',
                        DEFAULT: '#ff4035',
                    },
                    default: {
                        50: '#ffffff',
                        100: '#fff1e6',
                        200: '#ffe3cc',
                        300: '#ffd4b3',
                        400: '#ffc699',
                        500: '#ffb780',
                        600: '#ffa866',
                        700: '#ff994d',
                        800: '#ff8a33',
                        900: '#ff7b1a',
                        DEFAULT: '#ff994d',
                        foreground: '#262626',
                    },
                    primary: {
                        50: '#ffe5c3',
                        100: '#ffd8c2',
                        200: '#ffccaf',
                        300: '#ffc1a3',
                        400: '#ffb68a',
                        500: '#ffaa73',
                        600: '#ff9e5d',
                        700: '#ff9347',
                        800: '#ff8832',
                        900: '#ff7d1c',
                        DEFAULT: '#ff7d1c',
                    },
                    secondary: {
                        50: '#e1f7e4',
                        100: '#c4f0c9',
                        200: '#a3e7ad',
                        300: '#81dd92',
                        400: '#5fd477',
                        500: '#3dca5c',
                        600: '#2eb349',
                        700: '#239d3a',
                        800: '#18872c',
                        900: '#0d701e',
                        DEFAULT: '#5fd477',
                    },
                    success: {
                        50: '#e1f7f0',
                        100: '#c4f0e0',
                        200: '#a3e7d1',
                        300: '#81ddc1',
                        400: '#5fd4b2',
                        500: '#3dca9f',
                        600: '#2eb38b',
                        700: '#239d76',
                        800: '#188760',
                        900: '#0d704a',
                        DEFAULT: '#5fd4b2',
                    },
                    warning: {
                        50: '#fff4e1',
                        100: '#ffe8c4',
                        200: '#ffdb9f',
                        300: '#ffcd7a',
                        400: '#ffbf56',
                        500: '#ffb233',
                        600: '#e6992b',
                        700: '#cc8223',
                        800: '#b36a1b',
                        900: '#994e13',
                        DEFAULT: '#ffb233',
                    },
                    divider: '#ffe5c3',
                    focus: '#ffccaf',

                    overlay: '#fff7e9',
                },
                extend: 'light',
            },
        },
    }),
];
// export const plugins = [
//     nextui({
//         themes: {
//             light: {
//                 colors: {
//                     background: '#fff7e9', // or DEFAULT
//                     'bg-default-100': '#FFFFFF',
//                     foreground: '#11181C', // or 50 to 900 DEFAULT
//                     primary: {
//                         //... 50 to 900
//                         foreground: '#FFFFFF',
//                         DEFAULT: '#006FEE',
//                     },
//                     base: {
//                         default: '#FFE6BD',
//                     },
//                     // ... rest of the colors
//                 },
//             },
//             mytheme: {
//                 // custom theme
//                 extend: 'light',
//                 colors: {
//                     primary: {
//                         DEFAULT: '#BEF264',
//                         foreground: '#000000',
//                     },
//                     focus: '#BEF264',
//                     default: {
//                         "50": "#ffffff",
//                         "100": "#fff8f0",
//                         "200": "#ffeeda",
//                         "300": "#ffe4c4",
//                         "400": "#ffdbaf",
//                         "500": "#ffd199",
//                         "600": "#ffc783",
//                         "700": "#ffbd6d",
//                         "800": "#ffb357",
//                         "900": "#ffa941",
//                         "DEFAULT": "#ffe6bd",
//                         foreground: '#000000',
//                       },
//                     secondary: {
//                         DEFAULT: '#FFE6BD',
//                     },
//                 },
//             },
//         },
//     }),
// ];
