import { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Container,
	Typography,
	Button,
	Grid,
	Card,
	CardContent,
	CardMedia,
	Box,
	Alert,
	CircularProgress,
	Fab,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	TextField,
	InputAdornment
} from '@mui/material';
import {
	Add as AddIcon,
	Edit as EditIcon,
	Delete as DeleteIcon,
	Search as SearchIcon
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ListaProdutos = () => {
	const [produtos, setProdutos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [openDialog, setOpenDialog] = useState(false);
	const [produtoParaDeletar, setProdutoParaDeletar] = useState(null);
	const [termoPesquisa, setTermoPesquisa] = useState('');

	const navigate = useNavigate();

	useEffect(() => {
		carregarProdutos();
	}, []);

	const carregarProdutos = async () => {
		try {
			setLoading(true);
			const response = await axios.get('http://localhost:3001/produtos');
			setProdutos(response.data);
			setError('');
		} catch (error) {
			console.error('Erro ao carregar produtos:', error);
			setError(
				'Erro ao carregar produtos. Verifique se a API está rodando.'
			);
		} finally {
			setLoading(false);
		}
	};

	const formatarPreco = (preco) => {
		return new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL'
		}).format(preco);
	};

	const handleAbrirDialog = (produto) => {
		setProdutoParaDeletar(produto);
		setOpenDialog(true);
	};

	const handleFecharDialog = () => {
		setOpenDialog(false);
		setProdutoParaDeletar(null);
	};

	const handleDeletarProduto = async () => {
		if (!produtoParaDeletar) return;

		try {
			await axios.delete(
				`http://localhost:3001/produtos/${produtoParaDeletar.id}`
			);

			setProdutos(produtos.filter((p) => p.id !== produtoParaDeletar.id));

			handleFecharDialog();
		} catch (error) {
			console.error('Erro ao deletar produto:', error);
			setError('Erro ao deletar produto. Tente novamente.');
		}
	};

	const produtosFiltrados = produtos.filter((produto) => {
		const termo = termoPesquisa.toLowerCase();
		return (
			produto.nome.toLowerCase().includes(termo) ||
			produto.descricao.toLowerCase().includes(termo) ||
			produto.preco.toString().includes(termo)
		);
	});

	if (loading) {
		return (
			<Container
				maxWidth="md"
				sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
				<CircularProgress />
			</Container>
		);
	}

	return (
		<Container
			maxWidth="xl"
			sx={{ py: 4 }}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: { xs: 'column', md: 'row' },
					justifyContent: 'space-between',
					alignItems: { xs: 'stretch', md: 'center' },
					gap: 2,
					mb: 4
				}}>
				<Box>
					<Typography
						variant="h4"
						component="h1"
						sx={{
							fontWeight: 600,
							color: 'text.primary',
							mb: 1
						}}>
						Gerenciar Produtos
					</Typography>
					<Typography
						variant="body1"
						color="text.secondary">
						Gerencie seu catálogo de produtos de forma simples e
						eficiente
					</Typography>
				</Box>
				<Button
					variant="contained"
					size="large"
					startIcon={<AddIcon />}
					onClick={() => navigate('/produtos/cadastro')}
					sx={{
						backgroundColor: 'primary.main',
						borderRadius: 2,
						px: 3,
						py: 1.5,
						'&:hover': {
							backgroundColor: 'primary.dark',
							transform: 'translateY(-1px)'
						}
					}}>
					Novo Produto
				</Button>
			</Box>

			<TextField
				fullWidth
				variant="outlined"
				placeholder="Pesquisar por nome, descrição ou preço..."
				value={termoPesquisa}
				onChange={(e) => setTermoPesquisa(e.target.value)}
				sx={{
					mb: 4,
					'& .MuiOutlinedInput-root': {
						borderRadius: 3,
						backgroundColor: 'background.paper',
						'&:hover': {
							'& .MuiOutlinedInput-notchedOutline': {
								borderColor: 'primary.main'
							}
						}
					}
				}}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon color="action" />
						</InputAdornment>
					)
				}}
			/>

			{error && (
				<Alert
					severity="error"
					sx={{ mb: 3 }}>
					{error}
				</Alert>
			)}

			{produtosFiltrados.length === 0 && !error ? (
				<Alert severity="info">
					{termoPesquisa
						? `Nenhum produto encontrado para "${termoPesquisa}"`
						: 'Nenhum produto cadastrado. Clique em "Novo Produto" para adicionar o primeiro.'}
				</Alert>
			) : (
				<Grid
					container
					spacing={{ xs: 2, md: 3 }}>
					{produtosFiltrados.map((produto) => (
						<Grid
							item
							xs={12}
							sm={6}
							md={4}
							key={produto.id}>
							<Card
								sx={{
									height: 420,
									display: 'flex',
									flexDirection: 'column',
									transition: 'all 0.2s ease-in-out',
									position: 'relative',
									overflow: 'hidden',
									borderRadius: 2,
									border: '1px solid',
									borderColor: 'grey.200',
									boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
									'&:hover': {
										transform: 'translateY(-2px)',
										boxShadow:
											'0 4px 12px rgba(0, 0, 0, 0.1)',
										borderColor: 'grey.300'
									}
								}}>
								<CardMedia
									component="img"
									height="180"
									image={produto.imagem}
									alt={produto.nome}
									sx={{
										objectFit: 'cover',
										backgroundColor: 'grey.50'
									}}
									onError={(e) => {
										e.target.src =
											'https://via.placeholder.com/300x180/f8fafc/64748b?text=Sem+Imagem';
									}}
								/>
								<CardContent
									sx={{
										flexGrow: 1,
										p: 3,
										display: 'flex',
										flexDirection: 'column',
										height: 240
									}}>
									<Typography
										variant="h6"
										component="h2"
										sx={{
											fontWeight: 600,
											mb: 1,
											color: 'text.primary',
											lineHeight: 1.3,
											height: '2.6em',
											display: '-webkit-box',
											WebkitLineClamp: 2,
											WebkitBoxOrient: 'vertical',
											overflow: 'hidden'
										}}>
										{produto.nome}
									</Typography>
									<Typography
										variant="body2"
										color="text.secondary"
										sx={{
											mb: 'auto',
											lineHeight: 1.5,
											height: '4.5em',
											display: '-webkit-box',
											WebkitLineClamp: 3,
											WebkitBoxOrient: 'vertical',
											overflow: 'hidden'
										}}>
										{produto.descricao}
									</Typography>
									<Typography
										variant="h6"
										sx={{
											fontWeight: 700,
											color: 'primary.main',
											mb: 2,
											mt: 1
										}}>
										{formatarPreco(produto.preco)}
									</Typography>
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'flex-end',
											gap: 1
										}}>
										<IconButton
											size="small"
											sx={{
												color: 'grey.500',
												'&:hover': {
													color: 'primary.main',
													backgroundColor:
														'primary.50'
												}
											}}
											onClick={() =>
												navigate(
													`/produtos/editar/${produto.id}`
												)
											}>
											<EditIcon fontSize="small" />
										</IconButton>
										<IconButton
											size="small"
											sx={{
												color: 'grey.500',
												'&:hover': {
													color: 'error.main',
													backgroundColor: 'error.50'
												}
											}}
											onClick={() =>
												handleAbrirDialog(produto)
											}>
											<DeleteIcon fontSize="small" />
										</IconButton>
									</Box>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			)}

			<Dialog
				open={openDialog}
				onClose={handleFecharDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">
					Confirmar exclusão
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Tem certeza que deseja excluir o produto "
						{produtoParaDeletar?.nome}"? Esta ação não pode ser
						desfeita.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleFecharDialog}>Cancelar</Button>
					<Button
						onClick={handleDeletarProduto}
						color="error"
						variant="contained"
						autoFocus>
						Excluir
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
};

export default ListaProdutos;
