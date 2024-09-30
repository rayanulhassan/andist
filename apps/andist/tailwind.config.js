const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join, resolve } = require('path');
const colors = require('tailwindcss/colors');

const pallet_path = resolve(
  __dirname,
  './../../config/tailwind/utils/generate-palette'
);


const generatePalette = require(pallet_path);
const customPalettes = {
  brand: generatePalette('#808080'),
};
//colors.gray[600],
const themes = {
  // Default theme is required for theming system to work correctly!
  default: {
    primary: {
      ...colors.gray,
      DEFAULT: '#030712',
    },
    accent: {
      ...colors.slate,
      DEFAULT: colors.slate[800],
    },
    warn: {
      ...colors.red,
      DEFAULT: colors.red[600],
    },
    'on-warn': {
      500: colors.red['50'],
    },
  },
  // Rest of the themes will use the 'default' as the base
  // theme and will extend it with their given configuration.
  brand: {
    primary: customPalettes.brand,
  },
  teal: {
    primary: {
      ...colors.teal,
      DEFAULT: colors.teal[600],
    },
  },
  rose: {
    primary: colors.rose,
  },
  purple: {
    primary: {
      ...colors.purple,
      DEFAULT: colors.purple[600],
    },
  },
  amber: {
    primary: colors.amber,
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  important: true,
  content: [
    '../../libs/design-system/src/lib/**/**/!(*.stories|*.spec).{ts,html}',
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    screens: {
      sm: '600px',
      md: '768px',
      lg: '1280px',
      xl: '1440px',
    },
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      colors: {
        blue: {
          DEFAULT: '#0f44d7',
          light: '#5982f3',
          lightest: '#e7ecfb',
        },
        cyan: '#00ebd3',
        gray: {
          DEFAULT: '#a3a9bc',
          dark: '#46547a',
          darkest: '#292e3b',
          light: '#e7e9ef',
          lightest: '#f4f5f9',
        },
        white: {
          DEFAULT: '#ffffff',
          50: '#FFFFFF80',
        },
      },
      flex: {
        0: '0 0 auto',
      },

      opacity: {
        12: '0.12',
        38: '0.38',
        87: '0.87',
      },
      rotate: {
        '-270': '270deg',
        15: '15deg',
        30: '30deg',
        60: '60deg',
        270: '270deg',
      },
      scale: {
        '-1': '-1',
      },
      zIndex: {
        '-1': -1,
        49: 49,
        60: 60,
        70: 70,
        80: 80,
        90: 90,
        99: 99,
        999: 999,
        9999: 9999,
        99999: 99999,
      },
      spacing: {
        13: '3.25rem',
        15: '3.75rem',
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
        50: '12.5rem',
        90: '22.5rem',

        // Bigger values
        100: '25rem',
        120: '30rem',
        128: '32rem',
        140: '35rem',
        160: '40rem',
        180: '45rem',
        192: '48rem',
        200: '50rem',
        240: '60rem',
        256: '64rem',
        280: '70rem',
        320: '80rem',
        360: '90rem',
        400: '100rem',
        480: '120rem',

        // Fractional values
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
      },
      minHeight: ({ theme }) => ({
        ...theme('spacing'),
      }),
      maxHeight: {
        none: 'none',
      },
      minWidth: ({ theme }) => ({
        ...theme('spacing'),
        screen: '100vw',
      }),
      maxWidth: ({ theme }) => ({
        ...theme('spacing'),
        screen: '100vw',
      }),
      transitionDuration: {
        400: '400ms',
      },
      transitionTimingFunction: {
        drawer: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
      },
      boxShadow: {
        DEFAULT: '0px 5px 5px rgba(0,0,0,.02)',
        sm: '0 1px 2px 0 rgba(0,0,0,.05)',
        md: '0px 15px 25px rgba(0,0,0,.02)',
        lg: '0px 7px 23px rgba(70,84,122,.23)',
        xl: '0px 17px 43px rgba(70,84,122,.11)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        none: 'none',
      },

      // @tailwindcss/typography
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: 'var(--artisian-text-default)',
            '[class~="lead"]': {
              color: 'var(--artisian-text-secondary)',
            },
            a: {
              color: 'var(--artisian-primary-500)',
            },
            strong: {
              color: 'var(--artisian-text-default)',
            },
            'ol > li::before': {
              color: 'var(--artisian-text-secondary)',
            },
            'ul > li::before': {
              backgroundColor: 'var(--artisian-text-hint)',
            },
            hr: {
              borderColor: 'var(--artisian-border)',
            },
            blockquote: {
              color: 'var(--artisian-text-default)',
              borderLeftColor: 'var(--artisian-border)',
            },
            h1: {
              color: 'var(--artisian-text-default)',
            },
            h2: {
              color: 'var(--artisian-text-default)',
            },
            h3: {
              color: 'var(--artisian-text-default)',
            },
            h4: {
              color: 'var(--artisian-text-default)',
            },
            'figure figcaption': {
              color: 'var(--artisian-text-secondary)',
            },
            code: {
              color: 'var(--artisian-text-default)',
              fontWeight: '500',
            },
            'a code': {
              color: 'var(--artisian-primary)',
            },
            pre: {
              color: theme('colors.white'),
              backgroundColor: theme('colors.gray.800'),
            },
            thead: {
              color: 'var(--artisian-text-default)',
              borderBottomColor: 'var(--artisian-border)',
            },
            'tbody tr': {
              borderBottomColor: 'var(--artisian-border)',
            },
            'ol[type="A" s]': false,
            'ol[type="a" s]': false,
            'ol[type="I" s]': false,
            'ol[type="i" s]': false,
          },
        },
        sm: {
          css: {
            code: {
              fontSize: '1em',
            },
            pre: {
              fontSize: '1em',
            },
            table: {
              fontSize: '1em',
            },
          },
        },
      }),
    },
  },
  plugins: [
    // Artisian - Tailwind plugins
    require('../../config/tailwind/plugins/utilities'),
    require('../../config/tailwind/plugins/icon-size'),
    require('../../config/tailwind/plugins/theming')({
      themes,
    }),

    // Other third party and/or custom plugins
    require('@tailwindcss/typography')({ modifiers: ['sm', 'lg'] }),
  ],
};
