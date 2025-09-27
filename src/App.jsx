import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import EnvioForm from './pages/Envios/EnvioForm/EnvioForm';
import EnvioList from './pages/Envios/EnviosList/EnviosList';
import CadastroProduto from './pages/Produtos/CadastroProduto';
import ListaProdutos from './pages/Produtos/ListaProdutos';
import Layout from './components/Layout/Layout';
import theme from './theme/theme';
import './index.css';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Layout>
				<Routes>
					<Route
						path="/"
						Component={EnvioList}
					/>
					<Route
						path="/envios/novo"
						Component={EnvioForm}
					/>
					<Route
						path="/envios/editar/:id"
						Component={EnvioForm}
					/>
					<Route
						path="/produtos"
						Component={ListaProdutos}
					/>
					<Route
						path="/produtos/cadastro"
						Component={CadastroProduto}
					/>
					<Route
						path="/produtos/editar/:id"
						Component={CadastroProduto}
					/>
				</Routes>
			</Layout>
		</ThemeProvider>
	);
}

export default App;
