/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			keyframes: {
				appearFromBottom: {
					'0%': { transform: 'translateY(20px); opacity:0.6' },
					'100%': { transform: 'translateY(0); opacity:1' },
				},
				disappearLeft: {
					'0%': { transform: 'translateX(0); opacity:1' },
					'100%': { transform: 'translateX(-20px); opacity:0.3' },
				},
				expandRight: {
					'0%': { transform: 'scaleX(0) translateX(-90%)' },
					'100%': { transform: 'scaleX(1) translateX(0)' },
				},
				moveToRight: {
					'0%': { transform: 'translateX(-80%)' },
					'100%': { transform: 'translateX(0%)' },
				},
			},
			animation: {
				appearFromBottom: 'appearFromBottom 0.7s ease-in-out ',
				disappearLeft: 'disappearLeft 0.5s ease-in-out forwards',
				expandRight: 'expandRight .5s ease-in-out',
				moveToRightInfinite: 'moveToRight infinite 220s forwards linear ',
				moveToRightPaused: 'moveToRight 100s forwards paused linear ',
			},
			colors: {
				black: '#000000',
				tdg: '#797979',
				tg: '#C1C1C1',
				bgg: '#EFEFEF',
				redd: '#C55532',
				grn: '#79D064',
			},
			spacing: {
				0: '0',
				0.5: '0.5rem',
				1: '1rem',
				2: '2rem',
				4: '4rem',
			},
			fontSize: {
				1: '1rem',
				2: '2rem',
				3.5: '3.5rem',
				4: '4rem',
			},
			borderRadius: {
				s: '4px',
				m: '8px',
				l: '20px',
				round: '1000px',
			},
		},
	},
	plugins: [],
};
