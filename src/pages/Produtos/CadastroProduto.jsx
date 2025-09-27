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
			maxWidth="md"
			sx={{ mt: 4, mb: 4 }}>
			<Paper
				elevation={3}
				sx={{ p: 4 }}>
				<Typography
					variant="h4"
					component="h1"
					gutterBottom
					align="center"
					color="primary">
					{isEdicao ? 'Editar Produto' : 'Cadastro de Produto'}
				</Typography>

				<Typography
					variant="body1"
					gutterBottom
					align="center"
					color="text.secondary"
					sx={{ mb: 3 }}>
					{isEdicao
						? 'Edite as informações do produto abaixo'
						: 'Preencha as informações abaixo para cadastrar um novo produto'}
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
					sx={{ mt: 2 }}>
					<TextField
						fullWidth
						label="Nome do produto"
						value={nome}
						onChange={(e) => setNome(e.target.value)}
						margin="normal"
						required
						placeholder="Ex: Caneca Térmica Sage Green Pequena"
						helperText="Digite o nome completo do produto"
					/>

					<TextField
						fullWidth
						label="Preço do produto"
						type="number"
						value={preco}
						onChange={(e) => setPreco(e.target.value)}
						margin="normal"
						required
						inputProps={{
							step: '0.01',
							min: '0'
						}}
						placeholder="Ex: 24.00"
						helperText="Valor em reais (R$)"
					/>

					<TextField
						fullWidth
						label="Descrição"
						value={descricao}
						onChange={(e) => setDescricao(e.target.value)}
						margin="normal"
						required
						multiline
						rows={4}
						placeholder="Ex: Caneca elegante e compacta, mantém sua bebida quente ou fria por mais tempo."
						helperText="Descreva as características e benefícios do produto"
					/>

					<TextField
						fullWidth
						label="URL da imagem"
						value={imagem}
						onChange={(e) => setImagem(e.target.value)}
						margin="normal"
						required
						placeholder="Ex: https://exemplo.com/imagem.jpg"
						helperText="Link da imagem do produto (HTTPS)"
					/>

					<Box
						sx={{
							mt: 3,
							display: 'flex',
							gap: 2,
							justifyContent: 'center'
						}}>
						<Button
							type="button"
							variant="outlined"
							onClick={() => navigate('/produtos')}
							disabled={loading}>
							Voltar
						</Button>

						<Button
							type="submit"
							variant="contained"
							disabled={loading}
							startIcon={
								loading && <CircularProgress size={20} />
							}
							sx={{ minWidth: 120 }}>
							{loading
								? isEdicao
									? 'Atualizando...'
									: 'Cadastrando...'
								: isEdicao
								? 'Atualizar'
								: 'Cadastrar'}
						</Button>
					</Box>
				</Box>
			</Paper>
		</Container>
	);
};

export default CadastroProduto;
