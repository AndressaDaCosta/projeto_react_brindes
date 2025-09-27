import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#2563eb',
			light: '#3b82f6',
			dark: '#1d4ed8',
			contrastText: '#ffffff'
		},
		secondary: {
			main: '#7c3aed',
			light: '#8b5cf6',
			dark: '#6d28d9',
			contrastText: '#ffffff'
		},
		background: {
			default: '#f8fafc',
			paper: '#ffffff'
		},
		text: {
			primary: '#1e293b',
			secondary: '#64748b'
		},
		success: {
			main: '#10b981',
			light: '#34d399',
			dark: '#059669'
		},
		error: {
			main: '#ef4444',
			light: '#f87171',
			dark: '#dc2626'
		},
		warning: {
			main: '#f59e0b',
			light: '#fbbf24',
			dark: '#d97706'
		},
		info: {
			main: '#06b6d4',
			light: '#22d3ee',
			dark: '#0891b2'
		}
	},
	typography: {
		fontFamily: [
			'Inter',
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'sans-serif'
		].join(','),
		h1: {
			fontSize: '2.5rem',
			fontWeight: 700,
			lineHeight: 1.2
		},
		h2: {
			fontSize: '2rem',
			fontWeight: 600,
			lineHeight: 1.3
		},
		h3: {
			fontSize: '1.75rem',
			fontWeight: 600,
			lineHeight: 1.3
		},
		h4: {
			fontSize: '1.5rem',
			fontWeight: 600,
			lineHeight: 1.4
		},
		h5: {
			fontSize: '1.25rem',
			fontWeight: 600,
			lineHeight: 1.4
		},
		h6: {
			fontSize: '1.125rem',
			fontWeight: 600,
			lineHeight: 1.4
		},
		body1: {
			fontSize: '1rem',
			lineHeight: 1.6
		},
		body2: {
			fontSize: '0.875rem',
			lineHeight: 1.6
		},
		button: {
			textTransform: 'none',
			fontWeight: 500
		}
	},
	shape: {
		borderRadius: 12
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 8,
					padding: '10px 20px',
					fontSize: '0.95rem',
					fontWeight: 500,
					boxShadow: 'none',
					'&:hover': {
						boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
					}
				},
				contained: {
					'&:hover': {
						boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
					}
				}
			}
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 16,
					boxShadow:
						'0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
					border: '1px solid rgba(0, 0, 0, 0.05)',
					'&:hover': {
						boxShadow:
							'0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05)',
						transform: 'translateY(-2px)',
						transition: 'all 0.3s ease-in-out'
					}
				}
			}
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					borderRadius: 16,
					boxShadow:
						'0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)'
				}
			}
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					'& .MuiOutlinedInput-root': {
						borderRadius: 10,
						'&:hover .MuiOutlinedInput-notchedOutline': {
							borderColor: '#3b82f6'
						}
					}
				}
			}
		},
		MuiFab: {
			styleOverrides: {
				root: {
					boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
					'&:hover': {
						boxShadow: '0 8px 20px rgba(37, 99, 235, 0.4)'
					}
				}
			}
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: '#ffffff',
					color: '#1e293b',
					boxShadow:
						'0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)'
				}
			}
		}
	}
});

export default theme;
