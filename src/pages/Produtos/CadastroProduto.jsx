import { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Container,
	Paper,
	TextField,
	Button,
	Typography,
	Box,
	Alert,
	CircularProgress
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const CadastroProduto = () => {
	const [nome, setNome] = useState('');
	const [preco, setPreco] = useState('');
	const [descricao, setDescricao] = useState('');
	const [imagem, setImagem] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [messageType, setMessageType] = useState('');

	const navigate = useNavigate();
	const { id } = useParams();
	const isEdicao = Boolean(id);

	useEffect(() => {
		if (isEdicao) {
			carregarProduto();
		}
	}, [id, isEdicao]);

	const carregarProduto = async () => {
		try {
			setLoading(true);
			const response = await axios.get(
				`http://localhost:3001/produtos/${id}`
			);
			const produto = response.data;

			setNome(produto.nome);
			setPreco(produto.preco.toString());
			setDescricao(produto.descricao);
			setImagem(produto.imagem);
		} catch (error) {
			console.error('Erro ao carregar produto:', error);
			setMessage('Erro ao carregar produto para edição.');
			setMessageType('error');
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!nome || !preco || !descricao || !imagem) {
			setMessage('Todos os campos são obrigatórios!');
			setMessageType('error');
			return;
		}

		setLoading(true);
		setMessage('');

		try {
			const produtoData = {
				nome: nome.trim(),
				preco: parseFloat(preco),
				descricao: descricao.trim(),
				imagem: imagem.trim()
			};

			let response;

			if (isEdicao) {
				response = await axios.put(
					`http://localhost:3001/produtos/${id}`,
					produtoData
				);
				console.log('Produto atualizado com sucesso:', response.data);
				setMessage('Produto atualizado com sucesso!');
			} else {
				response = await axios.post(
					'http://localhost:3001/produtos',
					produtoData
				);
				console.log('Produto cadastrado com sucesso:', response.data);
				setMessage('Produto cadastrado com sucesso!');
			}

			setMessageType('success');

			if (!isEdicao) {
				setNome('');
				setPreco('');
				setDescricao('');
				setImagem('');
			}

			setTimeout(() => {
				navigate('/produtos');
			}, 2000);
		} catch (error) {
			console.error(
				`Erro ao ${isEdicao ? 'atualizar' : 'cadastrar'} produto:`,
				error
			);

			if (error.response?.data?.error) {
				setMessage(`Erro: ${error.response.data.error}`);
			} else {
				setMessage(
					`Erro ao ${
						isEdicao ? 'atualizar' : 'cadastrar'
					} produto. Tente novamente.`
				);
			}
			setMessageType('error');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container
			maxWidth="lg"
			sx={{ py: 4 }}>
			<Paper
				elevation={0}
				sx={{
					p: { xs: 3, md: 5 },
					borderRadius: 3,
					backgroundColor: 'background.paper',
					border: '1px solid',
					borderColor: 'grey.200',
					boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
				}}>
				<Typography
					variant="h3"
					component="h1"
					align="center"
					sx={{
						mb: 1,
						fontWeight: 600,
						color: 'text.primary'
					}}>
					{isEdicao ? 'Editar Produto' : 'Novo Produto'}
				</Typography>

				<Typography
					variant="body1"
					align="center"
					color="text.secondary"
					sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.6 }}>
					{isEdicao
						? 'Atualize as informações do produto conforme necessário'
						: 'Preencha os detalhes para adicionar um novo produto ao seu catálogo'}
				</Typography>

				{message && (
					<Alert
						severity={messageType}
						sx={{ mb: 3 }}>
						{message}
					</Alert>
				)}

				<Box
					component="form"
					onSubmit={handleSubmit}
					sx={{
						display: 'grid',
						gap: 3,
						gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }
					}}>
					<TextField
						fullWidth
						label="Nome do produto"
						value={nome}
						onChange={(e) => setNome(e.target.value)}
						required
						placeholder="Ex: Caneca Térmica Sage Green Pequena"
						helperText="Digite o nome completo do produto"
						sx={{
							gridColumn: { xs: '1', md: '1 / -1' },
							'& .MuiOutlinedInput-root': {
								borderRadius: 3
							}
						}}
					/>

					<TextField
						fullWidth
						label="Preço do produto"
						type="number"
						value={preco}
						onChange={(e) => setPreco(e.target.value)}
						required
						inputProps={{
							step: '0.01',
							min: '0'
						}}
						placeholder="Ex: 24.00"
						helperText="Valor em reais (R$)"
						sx={{
							'& .MuiOutlinedInput-root': {
								borderRadius: 3
							}
						}}
					/>

					<TextField
						fullWidth
						label="Descrição"
						value={descricao}
						onChange={(e) => setDescricao(e.target.value)}
						required
						multiline
						rows={4}
						placeholder="Ex: Caneca elegante e compacta, mantém sua bebida quente ou fria por mais tempo."
						helperText="Descreva as características e benefícios do produto"
						sx={{
							gridColumn: { xs: '1', md: '1 / -1' },
							'& .MuiOutlinedInput-root': {
								borderRadius: 3
							}
						}}
					/>

					<TextField
						fullWidth
						label="URL da imagem"
						value={imagem}
						onChange={(e) => setImagem(e.target.value)}
						required
						placeholder="Ex: https://exemplo.com/imagem.jpg"
						helperText="Link da imagem do produto (HTTPS)"
						sx={{
							'& .MuiOutlinedInput-root': {
								borderRadius: 3
							}
						}}
					/>

					<Box
						sx={{
							gridColumn: { xs: '1', md: '1 / -1' },
							mt: 2,
							display: 'flex',
							flexDirection: { xs: 'column', sm: 'row' },
							gap: 2,
							justifyContent: 'center'
						}}>
						<Button
							type="button"
							variant="outlined"
							size="large"
							onClick={() => navigate('/produtos')}
							disabled={loading}
							sx={{
								px: 4,
								py: 1.5,
								borderRadius: 3,
								borderWidth: 2,
								'&:hover': {
									borderWidth: 2
								}
							}}>
							Voltar
						</Button>

						<Button
							type="submit"
							variant="contained"
							size="large"
							disabled={loading}
							startIcon={
								loading && (
									<CircularProgress
										size={20}
										color="inherit"
									/>
								)
							}
							sx={{
								minWidth: 140,
								px: 4,
								py: 1.5,
								borderRadius: 2,
								backgroundColor: 'primary.main',
								'&:hover': {
									backgroundColor: 'primary.dark',
									transform: 'translateY(-1px)'
								}
							}}>
							{loading
								? isEdicao
									? 'Atualizando...'
									: 'Cadastrando...'
								: isEdicao
								? 'Atualizar Produto'
								: 'Cadastrar Produto'}
						</Button>
					</Box>
				</Box>
			</Paper>
		</Container>
	);
};

export default CadastroProduto;
