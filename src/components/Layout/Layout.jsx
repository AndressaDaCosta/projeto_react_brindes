import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Box,
	Container,
	IconButton,
	Avatar,
	Menu,
	MenuItem,
	useTheme,
	useMediaQuery,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider
} from '@mui/material';
import {
	Inventory as InventoryIcon,
	Add as AddIcon,
	Menu as MenuIcon,
	Home as HomeIcon,
	LocalShipping as ShippingIcon
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [mobileOpen, setMobileOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleProfileMenuClose = () => {
		setAnchorEl(null);
	};

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const menuItems = [
		{ text: 'Envios', icon: <ShippingIcon />, path: '/' },
		{ text: 'Produtos', icon: <InventoryIcon />, path: '/produtos' }
	];

	const drawer = (
		<Box
			sx={{ width: 250 }}
			role="presentation">
			<Box sx={{ p: 2, textAlign: 'center' }}>
				<Typography
					variant="h6"
					sx={{ fontWeight: 700, color: 'primary.main' }}>
					Gestão de Brindes
				</Typography>
			</Box>
			<Divider />
			<List>
				{menuItems.map((item) => (
					<ListItem
						button
						key={item.text}
						onClick={() => {
							navigate(item.path);
							setMobileOpen(false);
						}}
						sx={{
							backgroundColor:
								location.pathname === item.path
									? 'primary.light'
									: 'transparent',
							color:
								location.pathname === item.path
									? 'white'
									: 'text.primary',
							'&:hover': {
								backgroundColor:
									location.pathname === item.path
										? 'primary.main'
										: 'grey.100'
							},
							mx: 1,
							my: 0.5,
							borderRadius: 2
						}}>
						<ListItemIcon sx={{ color: 'inherit' }}>
							{item.icon}
						</ListItemIcon>
						<ListItemText primary={item.text} />
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100vh'
			}}>
			<AppBar
				position="sticky"
				elevation={0}>
				<Toolbar>
					{isMobile && (
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							sx={{ mr: 2 }}>
							<MenuIcon />
						</IconButton>
					)}

					<Typography
						variant="h6"
						component="div"
						sx={{
							flexGrow: 1,
							fontWeight: 700,
							color: 'primary.main'
						}}>
						Gestão de Brindes
					</Typography>

					{!isMobile && (
						<Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
							{menuItems.map((item) => (
								<Button
									key={item.text}
									startIcon={item.icon}
									onClick={() => navigate(item.path)}
									sx={{
										color:
											location.pathname === item.path
												? 'primary.main'
												: 'text.primary',
										backgroundColor:
											location.pathname === item.path
												? 'primary.light'
												: 'transparent',
										'&:hover': {
											backgroundColor: 'grey.100'
										}
									}}>
									{item.text}
								</Button>
							))}
						</Box>
					)}

					<Button
						variant="contained"
						startIcon={<AddIcon />}
						onClick={() => navigate('/produtos/cadastro')}
						sx={{
							backgroundColor: 'primary.main',
							mr: 2,
							'&:hover': {
								backgroundColor: 'primary.dark'
							}
						}}>
						{isMobile ? 'Novo' : 'Novo Produto'}
					</Button>

					<IconButton
						size="large"
						edge="end"
						aria-label="account of current user"
						aria-haspopup="true"
						onClick={handleProfileMenuOpen}
						color="inherit">
						<Avatar
							sx={{
								width: 32,
								height: 32,
								bgcolor: 'primary.main'
							}}>
							U
						</Avatar>
					</IconButton>
				</Toolbar>
			</AppBar>

			{isMobile && (
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true
					}}>
					{drawer}
				</Drawer>
			)}

			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleProfileMenuClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right'
				}}>
				<MenuItem onClick={handleProfileMenuClose}>Perfil</MenuItem>
				<MenuItem onClick={handleProfileMenuClose}>
					Configurações
				</MenuItem>
				<MenuItem onClick={handleProfileMenuClose}>Sair</MenuItem>
			</Menu>

			<Box
				component="main"
				sx={{
					flexGrow: 1,
					bgcolor: 'background.default',
					minHeight: 'calc(100vh - 64px)'
				}}>
				{children}
			</Box>
		</Box>
	);
};

export default Layout;
