const daisyui = require('daisyui');
const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  daisyui: {
    themes: [
      {
        default: {
          colors: {
            background: 'hsl(var(--background))',
            foreground: 'hsl(var(--foreground))',
            btn: {
              background: 'hsl(var(--btn-background))',
              'background-hover': 'hsl(var(--btn-background-hover))'
            },
          },
          primary: '#4f47e4',
          secondary:  '#e0e6fe',
          accent: '#10231a',
          neutral: '#e8eef2'
        }
      }
    ]
  },
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			'background-secondary': 'hsl(var(--background-secondary))',
  			btn: {
  				background: 'hsl(var(--btn-background))',
  				'background-hover': 'hsl(var(--btn-background-hover))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontSize: {
  			sm: 'clamp(0.7rem, 0.09vw + 0.68rem, 0.75rem)',
  			base: 'clamp(0.88rem, 0.23vw + 0.82rem, 1rem)',
  			lg: 'clamp(1.09rem, 0.43vw + 0.98rem, 1.33rem)',
  			xl: 'clamp(1.37rem, 0.74vw + 1.18rem, 1.78rem)',
  			'2xl': 'clamp(1.71rem, 1.2vw + 1.41rem, 2.37rem)',
  			'3xl': 'clamp(2.14rem, 1.86vw + 1.67rem, 3.16rem)',
  			'4xl': 'clamp(2.67rem, 2.8vw + 1.97rem, 4.21rem)',
  			'5xl': 'clamp(3.34rem, 4.13vw + 2.3rem, 5.61rem)',
  			'6xl': 'clamp(4.17rem, 6.01vw + 2.67rem, 7.48rem)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [typography, daisyui, forms, require("tailwindcss-animate")]
};
