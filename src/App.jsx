import { Routes, Route } from 'react-router-dom';

import EnvioForm from './pages/Envios/EnvioForm/EnvioForm';
import EnvioList from './pages/Envios/EnviosList/EnviosList';
import CadastroProduto from './pages/Produtos/CadastroProduto';
import ListaProdutos from './pages/Produtos/ListaProdutos';
import './index.css';

function App() {
	return (
		<>
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
		</>
	);
}

export default App;
