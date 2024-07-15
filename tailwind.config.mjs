/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {//
			typography: {
			  DEFAULT: {
				css: {
				  color: '#333',
				  marginBottom:'2',
				  h1: {
					color: '#1a202c',
					fontWeight: '700',
				  },
				  h2: {
					color: '#1a202c',
					fontWeight: '600',
				  },
				  h3: {
					color: '#1a202c',
					fontWeight: '500',
				  },
				  strong: {
					color: '#1a202c',
					fontWeight: '600',
				  },
				  em: {
					color: '#1a202c',
					fontStyle: 'italic',
				  },
				  blockquote: {
					borderLeftColor: '#a0aec0',
					fontStyle: 'italic',
				  },
				  'ul > li::marker': {
					color: '#4a5568',
				  },
				  'ol > li::marker': {
					color: '#4a5568',
				  },
				  table: {
					width: '100%',
					marginTop: '1rem',
					marginBottom: '1rem',
					borderCollapse: 'collapse',
					borderSpacing: '0',
					
				  },
				  'table th': {
					borderColor: '#cbd5e0',
					borderWidth: '1px',
					padding: '0.5rem',
				  },
				  'table td': {
					borderColor: '#cbd5e0',
					borderWidth: '1px',
					padding: '0.5rem',
				    textAlign:'center'
				  },
				},
			  },
			},
		  },
	},
	plugins: [
		require('@tailwindcss/typography'),
	  ],
}
