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
	DialogActions
} from '@mui/material';
import {
	Add as AddIcon,
	Edit as EditIcon,
	Delete as DeleteIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ListaProdutos = () => {
	const [produtos, setProdutos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [openDialog, setOpenDialog] = useState(false);
	const [produtoParaDeletar, setProdutoParaDeletar] = useState(null);

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
			maxWidth="lg"
			sx={{ mt: 4, mb: 4 }}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					mb: 3
				}}>
				<Typography
					variant="h4"
					component="h1"
					color="primary">
					Lista de Produtos
				</Typography>
				<Button
					variant="contained"
					startIcon={<AddIcon />}
					onClick={() => navigate('/produtos/cadastro')}>
					Novo Produto
				</Button>
			</Box>

			{error && (
				<Alert
					severity="error"
					sx={{ mb: 3 }}>
					{error}
				</Alert>
			)}

			{produtos.length === 0 && !error ? (
				<Alert severity="info">
					Nenhum produto cadastrado. Clique em "Novo Produto" para
					adicionar o primeiro.
				</Alert>
			) : (
				<Grid
					container
					spacing={3}>
					{produtos.map((produto) => (
						<Grid
							item
							xs={12}
							sm={6}
							md={4}
							key={produto.id}>
							<Card
								sx={{
									height: '100%',
									display: 'flex',
									flexDirection: 'column'
								}}>
								<CardMedia
									component="img"
									height="200"
									image={produto.imagem}
									alt={produto.nome}
									sx={{ objectFit: 'cover' }}
									onError={(e) => {
										e.target.src =
											'https://via.placeholder.com/300x200?text=Sem+Imagem';
									}}
								/>
								<CardContent sx={{ flexGrow: 1 }}>
									<Typography
										gutterBottom
										variant="h6"
										component="h2">
										{produto.nome}
									</Typography>
									<Typography
										variant="body2"
										color="text.secondary"
										sx={{ mb: 1 }}>
										{produto.descricao}
									</Typography>
									<Typography
										variant="h6"
										color="primary"
										fontWeight="bold">
										{formatarPreco(produto.preco)}
									</Typography>
									<Box
										sx={{
											mt: 2,
											display: 'flex',
											justifyContent: 'space-between',
											gap: 1
										}}>
										<Button
											variant="outlined"
											size="small"
											startIcon={<EditIcon />}
											sx={{ flex: 1 }}
											onClick={() =>
												navigate(
													`/produtos/editar/${produto.id}`
												)
											}>
											Editar
										</Button>
										<Button
											variant="outlined"
											color="error"
											size="small"
											startIcon={<DeleteIcon />}
											sx={{ flex: 1 }}
											onClick={() =>
												handleAbrirDialog(produto)
											}>
											Deletar
										</Button>
									</Box>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			)}

			<Fab
				color="primary"
				aria-label="add"
				sx={{ position: 'fixed', bottom: 16, right: 16 }}
				onClick={() => navigate('/produtos/cadastro')}>
				<AddIcon />
			</Fab>

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
